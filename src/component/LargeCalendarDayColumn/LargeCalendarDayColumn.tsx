import {Typography, withStyles} from '@material-ui/core'
import {CSSProperties,} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import { findTimeZone, getUTCOffset } from 'timezone-support'
import {HOURS_IN_DAY} from '../../constants'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import {IDateAndTimezone} from '../../model/IDateAndTimezone'
import calculateParallelColumns from '../../utility/calculateParallelColumns'
import eventPositioning from '../../utility/eventPositioning'
import Range from '../../utility/range/Range'
import EventBlock, {EventFields} from '../EventBlock/EventBlock'
import ClassNames from './ClassNames'
import styles from './styles'
import TESTING_CLASS_NAMES from './TestingClassNames'

export interface ILargeCalendarDayColumnProps<T extends IConcreteEvent> {
    alternate?: boolean
    date: Date
    now: IDateAndTimezone
    events: T[]
    allDayHeight?: number
    className?: string
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
    reportAllDayHeight?: (height: number) => void
}

const defaultWeekDayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultMonthDayFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format
const defaultEventRenderer: EventRenderer = (options) => (<EventBlock {...options} />)

export type LargeCalendarDayColumnProps<T extends IConcreteEvent> =
    ILargeCalendarDayColumnProps<T> &
    { classes: Record<ClassNames, string> }

const cls = (...classes: string[]) => classes.join(' ')

const calculateOffset = (now?: IDateAndTimezone): number => {
    const date = now?.date ?? new Date()
    try {
        return getUTCOffset(
            date,
            findTimeZone(now?.timezone ?? '')
        )
            .offset
    } catch (e) {
        return date.getTimezoneOffset()
    }
}

class LargeCalendarDayColumn<T extends IConcreteEvent>
    extends React.Component<LargeCalendarDayColumnProps<T>, {}>
{
    public render() {
        // const arbitraryHeight = 41
        const {
            className = '',
            classes: {
                // allDay,
                body,
                cell,
                cellAlternate,
                column,
                root,
                shade,
                header,
                headerText,
            },
            // allDayHeight = arbitraryHeight,
            date,
            now,
            display = {},
            events,
            i18nConfig = {},
            delegate = {},
            renderEvent = defaultEventRenderer
        } = this.props

        const utcOffset = calculateOffset(now)
        const midnight = new Date(date)
        midnight.setHours(0, utcOffset, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const timeRange = Range.fromToLessThan(midnight, tomorrow)

        const columnIsInThePast = now.date >= timeRange.upper
        const columnIsCurrent = timeRange.containsValue(now.date)
        const shadeHeight = (
            columnIsInThePast ?
                '100%' :
                (columnIsCurrent ?
                    eventPositioning({
                        columns: 1,
                        event: Range.fromToLessThan(now.date, now.date),
                        index: 0,
                        range: timeRange
                    }).top :
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
                <Typography variant={'h5'} className={headerText}>
                    {weekDayFormatter(date)}
                </Typography>
                <Typography variant={'subtitle1'} className={headerText}>
                    {monthDayFormatter(date)}
                </Typography>
            </div>
            {/*<div*/}
            {/*    className={cls(TESTING_CLASS_NAMES.allDay, allDay)}*/}
            {/*    style={{ height: allDayHeight ? `${allDayHeight}px` : 'auto' }}*/}
            {/*>*/}
            {/*    { allEvents.map((event, index) =>*/}
            {/*        (<div*/}
            {/*            key={index}*/}
            {/*            className={event.className}*/}
            {/*            ref={(container: HTMLDivElement) => this.handleAllDayRef(container)}*/}
            {/*        >*/}
            {/*            {event.description}*/}
            {/*        </div>)*/}
            {/*    ) }*/}
            {/*</div>*/}
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
                                event,
                                i18nConfig,
                                key: `${index}`,
                                style: eventPositioning({
                                    ...columnInfoMap[index]!,
                                    event: Range.fromToLessThan(event.start, event.end),
                                    range: Range.fromToLessThan(midnight, tomorrow)
                                }) as CSSProperties
                            })
                        )
                    }
                </div>
            </div>
        </div>
    }

    public handleAllDayRef(container: HTMLDivElement) {
        const { reportAllDayHeight } = this.props
        if (container) {
            const height = container.clientHeight
            if (reportAllDayHeight) {
                reportAllDayHeight(height)
            }
        }
    }
}

export const undecorated = LargeCalendarDayColumn

const decorated = withStyles(styles)(LargeCalendarDayColumn)

export default decorated
