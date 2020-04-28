import {createStyles, Overwrite, Theme, Typography, withStyles} from '@material-ui/core'
import {
    CSSProperties,
    StyledComponentProps
} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import calculateParallelColumns from '../../utility/calculateParallelColumns'
import eventPositioning from '../../utility/eventPositioning'
import Range from '../../utility/range/Range'
import EventBlock, {EventFields} from '../EventBlock/EventBlock'

export const TESTING_CLASS_NAMES = {
    body: 'large-calendar-day-column-body',
    cellAlternate: 'large-calendar-day-column-cell-alternate',
    header: 'large-calendar-day-column-header',
    hourCell: 'large-calendar-day-column-cell',
    shade: 'large-calendar-day-column-shade'
}

export interface ILargeCalendarDayColumnProps {
    alternate?: boolean
    date: Date
    now: Date
    events: IConcreteEvent[]
    className?: string
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

type ClassNames =
    | 'body'
    | 'cell'
    | 'cellAlternate'
    | 'column'
    | 'header'
    | 'headerText'
    | 'root'
    | 'shade'

const firstChildBorderFix = `&:first-child .${TESTING_CLASS_NAMES.body}`

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    body: {
        borderBottomWidth: 0,
        borderColor: theme.palette.grey.A100,
        borderLeftWidth: 0,
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderTopWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 9000,
        position: 'relative'
    },
    cell: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
    },
    cellAlternate: {
        backgroundColor: theme.palette.grey.A100,
        borderBottomColor: theme.palette.background.paper
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
        [firstChildBorderFix]: {
            borderLeftWidth: '1px'
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    shade: {
        background: 'black',
        left: 0,
        opacity: 0.5,
        position: 'absolute',
        right: 0,
        top: 0,
    }
})

const defaultWeekDayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultMonthDayFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format
const defaultEventRenderer: EventRenderer = (options) => (<EventBlock {...options} />)

export type LargeCalendarDayColumnProps =
    ILargeCalendarDayColumnProps &
    { classes: Record<ClassNames, string> }

const cls = (...classes: string[]) => classes.join(' ')

class LargeCalendarDayColumn extends React.Component<LargeCalendarDayColumnProps, {}> {
    public render() {
        const {
            className = '',
            classes: {
                body,
                cell,
                cellAlternate,
                column,
                root,
                shade,
                header,
                headerText,
            },
            date,
            now,
            display = {},
            emphasise = {},
            events,
            i18nConfig = {},
            delegate = {},
            renderEvent = defaultEventRenderer
        } = this.props

        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const timeRange = Range.fromToLessThan(midnight, tomorrow)

        const columnIsInThePast = now >= timeRange.upper
        const columnIsCurrent = timeRange.containsValue(now)
        const shadeHeight = (
            columnIsInThePast ?
                '100%' :
                (columnIsCurrent ?
                    eventPositioning(
                        {end: now, start: now},
                        { columns: 1, index: 0 },
                        now
                    ).top :
                    '0%'
                )
        )

        const allEvents = events
            .filter(event =>
                Range.fromToLessThan(event.start, event.end).overlapsRange(timeRange)
            )

        const columnInfoMap = allEvents
            .map(event =>
                Range.fromToLessThan(event.start, event.end)
            )
            .map((range, _, allRanges) =>
                calculateParallelColumns(range, allRanges)
            )

        const weekDayFormatter = i18nConfig.weekDayFormatter || defaultWeekDayFormatter
        const monthDayFormatter = i18nConfig.monthDayFormatter || defaultMonthDayFormatter

        const hourCellClassFragments = [ TESTING_CLASS_NAMES.hourCell ]
        if (this.props.alternate) {
            hourCellClassFragments.push(TESTING_CLASS_NAMES.cellAlternate)
            hourCellClassFragments.push(cellAlternate)
        }
        const hourCellClassName = cls(...hourCellClassFragments)

        return <div className={cls(root, className)}>
            <div className={cls(TESTING_CLASS_NAMES.header, header)}>
                <Typography variant={'title'} className={headerText}>
                    {weekDayFormatter(date)}
                </Typography>
                <Typography variant={'subheading'} className={headerText}>
                    {monthDayFormatter(date)}
                </Typography>
            </div>
            <div className={cls(TESTING_CLASS_NAMES.body, body)}>
                <div
                    className={cls(TESTING_CLASS_NAMES.shade, shade)}
                    style={{ height: shadeHeight }}
                />
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
                            renderEvent({
                                delegate,
                                display,
                                emphasise,
                                event,
                                i18nConfig,
                                key: `${index}`,
                                style: eventPositioning(
                                    event,
                                    columnInfoMap[index]!,
                                    date
                                ) as CSSProperties
                            })
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
