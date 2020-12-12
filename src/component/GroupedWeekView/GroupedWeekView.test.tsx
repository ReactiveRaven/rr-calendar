import {mount} from 'enzyme'
import * as React from 'react'
import {DAYS_IN_WEEK, HOURS_IN_DAY} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import EventBlock from '../EventBlock/EventBlock'
import TESTING_CLASS_NAMES from '../VerticalSchedulerColumn/TESTING_CLASS_NAMES'
import GroupedWeekView from './GroupedWeekView'

const HALF = 2

describe('GroupedWeekView', () => {
    const swimlanes: ISwimlane[] = [
        {
            label: 'foo',
            unitHeight: 1
        }
    ]
    const swimlaneForEvent = (event: IConcreteEvent) => event.className

    const defaultProps = {
        date: new Date('2000-12-31T09:00:00Z'),
        events: [],
        swimlaneForEvent,
        swimlanes
    }

    it('should render without crashing', () => {
        expect(() => mount(<GroupedWeekView {...defaultProps}/>)).not.toThrow()
    })

    it('should show seven day-columns', () => {
        const component = mount(<GroupedWeekView {...defaultProps}/>)
        expect(component.find('VerticalSchedulerColumn')).toHaveLength(DAYS_IN_WEEK)
    })

    it('should show the correct week around the selected date', () => {
        const component = mount(<GroupedWeekView
            {...defaultProps}
            date={new Date('2000-12-31T23:59:59.999Z')}
            weekDayStart={WeekDayStart.Sunday}
        />)

        const expectedStrings = ['Sun31', 'Mon1', 'Tue2', 'Wed3', 'Thu4', 'Fri5', 'Sat6']

        component
            .find('VerticalSchedulerColumn')
            .find(`.${TESTING_CLASS_NAMES.header}`)
            .map(wrapper => wrapper.text())
            .forEach((text, index) => expect(text).toEqual(expectedStrings[index]))
    })

    it('should show the correct week around the selected date by default', () => {
        const component = mount(<GroupedWeekView
            {...defaultProps}
            date={new Date('2000-12-31T23:59:59.999Z')}
        />)

        const expectedStrings = ['Mon25', 'Tue26', 'Wed27', 'Thu28', 'Fri29', 'Sat30', 'Sun31']

        component
            .find('VerticalSchedulerColumn')
            .find(`.${TESTING_CLASS_NAMES.header}`)
            .map(wrapper => wrapper.text())
            .forEach((text, index) => expect(text).toEqual(expectedStrings[index]))
    })

    it('should pass down display keys properly', () => {
        const displayObject = {}

        const component = mount(<GroupedWeekView
            {...defaultProps}
            display={displayObject}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('display')
        )
            .toEqual(displayObject)
    })

    it('should pass down events keys properly', () => {
        const events: IConcreteEvent[] = []

        const component = mount(<GroupedWeekView
            {...defaultProps}
            events={events}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('events')
        )
            .toEqual(events)
    })

    it('should pass i18nConfig key down properly', () => {
        const i18nConfig = {}

        const component = mount(<GroupedWeekView
            {...defaultProps}
            i18nConfig={i18nConfig}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('i18nConfig')
        )
            .toEqual(i18nConfig)
    })

    it('should pass delegate down properly', () => {
        const delegate = {}

        const component = mount(<GroupedWeekView
            {...defaultProps}
            delegate={delegate}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('delegate')
        )
            .toBe(delegate)
    })

    it('should pass renderEvent down properly', () => {
        const renderEvent: EventRenderer = (options) => <EventBlock {...options} />

        const component = mount(<GroupedWeekView
            {...defaultProps}
            renderEvent={renderEvent}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('renderEvent')
        )
            .toBe(renderEvent)
    })

    it('should pass down the correct unitHeights for each swimlane', () => {
        const midnight = new Date(defaultProps.date)
        midnight.setHours(0, 0, 0, 0)
        const noon = new Date(midnight)
        noon.setHours(HOURS_IN_DAY / HALF)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)

        const events: IConcreteEvent[] = [
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: noon,
                start: midnight
            },
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            }
        ]

        const component = mount(<GroupedWeekView
            {...defaultProps}
            events={events}
        />)

        const firstColumn = component.find('VerticalSchedulerColumn').first()

        expect(firstColumn.prop('swimlanes')).toEqual([
            {
                label: 'baz',
                unitHeight: 2
            },
            {
                label: 'foo',
                unitHeight: 1
            }
        ] as ISwimlane[])
    })

    it('should correctly map events to their swimlanes', () => {
        const midnight = new Date(defaultProps.date)
        midnight.setHours(0, 0, 0, 0)
        const noon = new Date(midnight)
        noon.setHours(HOURS_IN_DAY / HALF)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)

        const events: IConcreteEvent[] = [
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: noon,
                start: midnight
            },
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            }
        ]

        const component = mount(<GroupedWeekView
            {...defaultProps}
            events={events}
        />)

        const firstColumn = component
            .find('VerticalSchedulerColumn')
            .first()

        const mappedSwimlaneForEvent: (
            event: IConcreteEvent,
            mappedSwimlanes: ISwimlane[]
        ) => ISwimlane =
            firstColumn
                .prop('swimlaneForEvent')

        const mappedSwimlanes: ISwimlane[] = firstColumn.prop('swimlanes')

        events.forEach(event =>
            expect(mappedSwimlaneForEvent(event, mappedSwimlanes).label)
                .toEqual(event.className)
        )
    })
})
