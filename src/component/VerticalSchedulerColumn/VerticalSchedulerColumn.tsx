import {createStyles, Theme, Typography, withStyles} from '@material-ui/core'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import calculateParallelColumns from '../../utility/calculateParallelColumns'
import eventPositioning, {IPositionInfo} from '../../utility/eventPositioning'
import Range from '../../utility/range/Range'
import EventBlock, {EventFields} from '../EventBlock/EventBlock'

export const TESTING_CLASS_NAMES = {
    body: 'vertical-swimlane-column-body',
    header: 'vertical-swimlane-column-header',
    hourCell: 'vertical-swimlane-column-cell',
    swimlane: 'vertical-swimlane-column-swimlane'
}

type ClassNames =
    | 'body'
    | 'cell'
    | 'column'
    | 'header'
    | 'headerText'
    | 'root'
    | 'swimlane'

const firstChildBorderFix = `&:first-child .${TESTING_CLASS_NAMES.body}`

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    body: {
        borderBottomWidth: '1px',
        borderColor: theme.palette.grey.A100,
        borderLeftWidth: 0,
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderTopWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 9000,
        position: 'relative',
    },
    cell: {
        '&:first-child': {
            borderLeft: 'none !important',
        },
        backgroundColor: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%'
    },
    column: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
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
        flexGrow: 1,
        height: '100%'
    },
    swimlane: {
        '&:first-child': {
            borderTop: 'none'
        },
        borderTop: `1px solid ${theme.palette.grey.A100}`,
        position: 'relative',
    }
})

export interface IVerticalSchedulerColumnOwnProps {
    date: Date
    events: IConcreteEvent[]
    renderEvent?: EventRenderer
    className?: string
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    swimlanes: ISwimlane[]
    swimlaneForEvent: (event: IConcreteEvent, swimlanes: ISwimlane[]) => ISwimlane
}

type VerticalSchedulerColumnProps =
    & IVerticalSchedulerColumnOwnProps
    & { classes: Record<ClassNames, string> }

const defaultWeekDayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultMonthDayFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format
const defaultEventRenderer: EventRenderer = (options) => (
    <EventBlock
        {...options}
    />
)

const cls = (...classes: string[]) => classes.join(' ')

class VerticalSchedulerColumn
    extends React.Component<VerticalSchedulerColumnProps, {}>
{
    public render() {
        const {
            date,
            i18nConfig = {},
            classes: {
                column,
                root,
                body,
                cell,
                header,
                headerText,
                swimlane: swimlaneClass
            },
            swimlanes,
            events,
            emphasise = {},
            display = {},
            delegate = {},
            renderEvent = defaultEventRenderer
        } = this.props
        const {
            weekDayFormatter = defaultWeekDayFormatter,
            monthDayFormatter = defaultMonthDayFormatter
        } = i18nConfig
        const {
            header: headerTesting,
            body: bodyTesting,
            hourCell: hourCellTesting,
            swimlane: swimlaneTesting
        } = TESTING_CLASS_NAMES

        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)
        const displayRange = Range.fromToLessThan(midnight, tomorrow)

        const eventRangeMap = events
            .reduce(
                (map, event) => {
                    map.set(event, Range.fromToLessThan(event.start, event.end))
                    return map
                },
                new Map<IConcreteEvent, Range<Date>>()
            )

        const displayedEvents = events
            .filter(event => displayRange.overlapsRange(eventRangeMap.get(event)!))

        const eventSwimlaneMap = displayedEvents
            .reduce(
                (map, event) => {
                    map.set(event, this.props.swimlaneForEvent(event, swimlanes))
                    return map
                },
                new Map<IConcreteEvent, ISwimlane>()
            )

        const swimlaneEventsMap = swimlanes
            .reduce(
                (map, swimlane) => {
                    map.set(
                        swimlane,
                        displayedEvents.filter(event => eventSwimlaneMap.get(event) === swimlane)
                    )
                    return map
                },
                new Map<ISwimlane, IConcreteEvent[]>()
            )

        const columnInfoMap = displayedEvents
            .reduce(
                (map, event) => {
                    const range = eventRangeMap.get(event)!
                    const swimlane = eventSwimlaneMap.get(event)!
                    const otherRanges = swimlaneEventsMap
                        .get(swimlane)!
                        .map(otherEvent => eventRangeMap.get(otherEvent)!)
                    map.set(event, calculateParallelColumns(range, otherRanges))
                    return map
                },
                new Map<IConcreteEvent, IPositionInfo>()
            )

        return (
            <div className={root}>
                <div className={cls(headerTesting, header)}>
                    <Typography variant={'title'} className={headerText}>
                        {weekDayFormatter(date)}
                    </Typography>
                    <Typography variant={'subheading'} className={headerText}>
                        {monthDayFormatter(date)}
                    </Typography>
                </div>
                <div className={cls(bodyTesting, body)}>
                    {
                        Range.fromToLessThan(0, HOURS_IN_DAY).asArray()
                            .map(value => <div
                                key={`${value}`}
                                className={cls(hourCellTesting, cell)}
                            />)
                    }
                    <div className={column}>
                        { swimlanes
                            .map(swimlane => (
                                <div
                                    key={swimlane.label}
                                    className={cls(swimlaneTesting, swimlaneClass)}
                                    style={{flexGrow: swimlane.unitHeight}}
                                >
                                    { swimlaneEventsMap.get(swimlane)!
                                        .sort((a, b) => a.start.getTime() - b.start.getTime())
                                        .map((event: IConcreteEvent, index) =>
                                            renderEvent({
                                                delegate,
                                                display,
                                                emphasise,
                                                event,
                                                i18nConfig,
                                                key: `${swimlane.label}:${index}`,
                                                style: this.correctPositioning(eventPositioning(
                                                    event,
                                                    columnInfoMap.get(event)!,
                                                    date
                                                )) as CSSProperties
                                            })
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    private correctPositioning = (positioning: IPositioning): IPositioning => {
        return {
            height: positioning.width,
            left: positioning.top,
            top: positioning.left,
            width: positioning.height
        }
    }
}

interface IPositioning {
    height: string
    left: string
    top: string
    width: string
}

export default withStyles(styles)(VerticalSchedulerColumn)
