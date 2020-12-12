import {Typography, withStyles} from '@material-ui/core'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import calculateParallelColumns, {IPositionInfoPartial} from '../../utility/calculateParallelColumns'
import eventPositioning from '../../utility/eventPositioning'
import Range from '../../utility/range/Range'
import EventBlock, {EventFields} from '../EventBlock/EventBlock'
import ClassNames from './ClassNames'
import styles from './styles'
import TESTING_CLASS_NAMES from './TESTING_CLASS_NAMES'

export interface IVerticalSchedulerColumnOwnProps<T extends IConcreteEvent> {
    date: Date
    events: T[]
    renderEvent?: EventRenderer
    className?: string
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    swimlanes: ISwimlane[]
    swimlaneForEvent: (event: T, swimlanes: ISwimlane[]) => ISwimlane
}

type VerticalSchedulerColumnProps<T extends IConcreteEvent> =
    & IVerticalSchedulerColumnOwnProps<T>
    & { classes: Record<ClassNames, string> }

const defaultWeekDayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultMonthDayFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format
const defaultEventRenderer: EventRenderer = (options) => (
    <EventBlock
        {...options}
    />
)

const cls = (...classes: string[]) => classes.join(' ')

class VerticalSchedulerColumn<T extends IConcreteEvent>
    extends React.Component<VerticalSchedulerColumnProps<T>, {}>
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
                new Map<IConcreteEvent, IPositionInfoPartial>()
            )

        return (
            <div className={root}>
                <div className={cls(headerTesting, header)}>
                    <Typography variant={'h5'} className={headerText}>
                        {weekDayFormatter(date)}
                    </Typography>
                    <Typography variant={'subtitle1'} className={headerText}>
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
                                                event,
                                                i18nConfig,
                                                key: `${swimlane.label}:${index}`,
                                                style: this.correctPositioning(eventPositioning({
                                                    ...columnInfoMap.get(event)!,
                                                    event: Range.fromToLessThan(
                                                        event.start,
                                                        event.end
                                                    ),
                                                    range: displayRange
                                                })) as CSSProperties
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
