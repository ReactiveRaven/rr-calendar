import {createStyles, Overwrite, Theme, Typography, withStyles} from '@material-ui/core'
import * as React from 'react'
import {
    CSSProperties,
    StyledComponentProps
} from '../../../node_modules/@material-ui/core/styles/withStyles'
import {HOURS_IN_DAY} from '../../constants'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import calculateParallelColumns from '../../utility/calculateParallelColumns'
import eventPositioning from '../../utility/eventPositioning'
import Range from '../../utility/range/Range'
import EventBlock, {EventFields} from '../EventBlock/EventBlock'

export interface ILargeCalendarDayColumnProps {
    date: Date
    events: IConcreteEvent[]
    className?: string
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
}

type ClassNames =
    | 'body'
    | 'cell'
    | 'column'
    | 'header'
    | 'headerText'
    | 'root'


const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    body: {
        background: 'yellow',
        borderRightColor: theme.palette.grey.A100,
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 9000,
        position: 'relative',
    },
    cell: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
    },
    column: {
        boxSizing: 'border-box',
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        flexGrow: 1,
        padding: theme.spacing.unit,
        textAlign: 'left',
    },
    headerText: {
        color: theme.palette.primary.contrastText
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
})

const defaultWeekDayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultMonthDayFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format

export type LargeCalendarDayColumnProps =
    ILargeCalendarDayColumnProps &
    { classes: Record<ClassNames, string> }

export const TESTING_CLASS_NAMES = {
    body: 'large-calendar-day-column-body',
    header: 'large-calendar-day-column-header',
    hourCell: 'large-calendar-day-column-cell'
}

const cls = (...classes: string[]) => classes.join(' ')

class LargeCalendarDayColumn extends React.Component<LargeCalendarDayColumnProps, {}> {
    public render() {
        const {
            className = '',
            classes: {
                body,
                cell,
                column,
                root,
                header,
                headerText,
            },
            date,
            display = {},
            emphasise = {},
            events,
            i18nConfig = {},
            delegate
        } = this.props

        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const timeRange = Range.fromToLessThan(midnight.getTime(), tomorrow.getTime())

        const allEvents = events
            .filter(event =>
                Range.fromToLessThan(event.start.getTime(), event.end.getTime())
                    .overlapsRange(timeRange)
            )

        const columnInfoMap = allEvents
            .map(event =>
                Range.fromToLessThan(event.start.getTime(), event.end.getTime())
            )
            .map((range, _, allRanges) =>
                calculateParallelColumns(range, allRanges)
            )

        const weekDayFormatter = i18nConfig.weekDayFormatter || defaultWeekDayFormatter
        const monthDayFormatter = i18nConfig.monthDayFormatter || defaultMonthDayFormatter

        const hourCellClassName = [ TESTING_CLASS_NAMES.hourCell ].join(' ')

        return <div className={cls(root, className)}>
            <div className={cls(TESTING_CLASS_NAMES.header, header)}>
                <Typography variant={'title'} className={headerText}>
                    {weekDayFormatter(this.props.date)}
                </Typography>
                <Typography variant={'subheading'} className={headerText}>
                    {monthDayFormatter(this.props.date)}
                </Typography>
            </div>
            <div className={cls(TESTING_CLASS_NAMES.body, body)}>
                {
                    Range.fromToLessThan(0, HOURS_IN_DAY).asArray()
                        .map(value => <div
                            key={`${value}`}
                            className={cls(hourCellClassName, cell)}
                        />)
                }
                <div className={column}>
                    { allEvents
                        .map((event, index) =>
                            <EventBlock
                                className={event.className}
                                accentClassName={event.accentClassName}
                                event={event}
                                key={`${index}`}
                                style={eventPositioning(
                                    event,
                                    columnInfoMap[index],
                                    date
                                )}
                                emphasise={emphasise}
                                display={display}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
                            />
                        )

                    }
                </div>
            </div>
        </div>
    }
}

export const undecorated = LargeCalendarDayColumn

const decorated: React.ComponentType<
    Overwrite<
        ILargeCalendarDayColumnProps,
        StyledComponentProps<ClassNames>
    >
> = withStyles(styles)(LargeCalendarDayColumn)

export default decorated
