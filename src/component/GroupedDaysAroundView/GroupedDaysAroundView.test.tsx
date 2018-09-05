import {mount} from 'enzyme'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import {TESTING_CLASS_NAMES} from '../VerticalSchedulerColumn/VerticalSchedulerColumn'
import GroupedDaysAroundView from './GroupedDaysAroundView'

const HALF = 2

describe('GroupedDaysAroundView', () => {
    const swimlaneForEvent = (event: IConcreteEvent): string => event.className
    const date = new Date()
    const events: IConcreteEvent[] = []
    const defaultProps = {
        date,
        events,
        swimlaneForEvent
    }

    it('should render without crashing', () => {
        expect(() => mount(<GroupedDaysAroundView {...defaultProps} />)).not.toThrow()
    })

    it('should show the requested number of days before/after the current date', () => {
        expect(
            mount(<GroupedDaysAroundView {...defaultProps} />)
                .find('VerticalSchedulerColumn')
        )
            .toHaveLength(1)

        const beforeAndToday = 2
        expect(
            mount(<GroupedDaysAroundView {...defaultProps} before={1} />)
                .find('VerticalSchedulerColumn')
        )
            .toHaveLength(beforeAndToday)

        const afterAndToday = 2
        expect(
            mount(<GroupedDaysAroundView {...defaultProps} after={1} />)
                .find('VerticalSchedulerColumn')
        )
            .toHaveLength(afterAndToday)

        const beforeAndAfterAndToday = 3
        expect(
            mount(<GroupedDaysAroundView {...defaultProps} after={1} before={1} />)
                .find('VerticalSchedulerColumn')
        )
            .toHaveLength(beforeAndAfterAndToday)
    })

    it('should show the correct requested dates', () => {
        const knownDate = new Date('2000-12-31T23:59:59')

        const dateStrings = ['Fri29', 'Sat30', 'Sun31', 'Mon1', 'Tue2']

        const numAround = 2
        const component = mount(<GroupedDaysAroundView
            {...defaultProps}
            date={knownDate}
            after={numAround}
            before={numAround}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .find(`.${TESTING_CLASS_NAMES.header}`)
                .map(wrapper => wrapper.text())
        )
            .toEqual(dateStrings)
    })

    it('should pass emphasise key down as expected', () => {
        const emphasisObject = {}

        expect(
            mount(<GroupedDaysAroundView
                {...defaultProps}
                emphasise={emphasisObject}
            />)
                .find('VerticalSchedulerColumn')
                .prop('emphasise')
        )
            .toBe(emphasisObject)
    })

    it('should pass display key down as expected', () => {
        const displayObject = {}

        expect(
            mount(<GroupedDaysAroundView
                {...defaultProps}
                display={displayObject}
            />)
                .find('VerticalSchedulerColumn')
                .prop('display')
        )
            .toBe(displayObject)
    })

    it('should pass i18nConfig key down properly', () => {
        const i18nConfig = {}

        const component = mount(<GroupedDaysAroundView
            {...defaultProps}
            i18nConfig={i18nConfig}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('i18nConfig')
        )
            .toBe(i18nConfig)
    })

    it('should pass delegate down properly', () => {
        const delegate = {}

        const component = mount(<GroupedDaysAroundView
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

    it('should pass events down properly', () => {
        const customEvents: IConcreteEvent[] = []

        const component = mount(<GroupedDaysAroundView
            {...defaultProps}
            events={customEvents}
        />)

        expect(
            component
                .find('VerticalSchedulerColumn')
                .first()
                .prop('events')
        )
            .toBe(customEvents)
    })

    it('should pass down the correct unitHeights for each swimlane', () => {
        const midnight = new Date()
        midnight.setHours(0, 0, 0, 0)
        const noon = new Date(midnight)
        noon.setHours(HOURS_IN_DAY / HALF)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)

        const customEvents: IConcreteEvent[] = [
            {
                accentClassName: 'bar',
                attributes: {},
                className: 'foo',
                end: noon,
                people: [],
                start: midnight
            },
            {
                accentClassName: 'bar',
                attributes: {},
                className: 'foo',
                end: tomorrow,
                people: [],
                start: noon
            },
            {
                accentClassName: 'quux',
                attributes: {},
                className: 'baz',
                end: tomorrow,
                people: [],
                start: noon
            },
            {
                accentClassName: 'quux',
                attributes: {},
                className: 'baz',
                end: tomorrow,
                people: [],
                start: noon
            }
        ]

        const component = mount(<GroupedDaysAroundView
            date={midnight}
            events={customEvents}
            swimlaneForEvent={swimlaneForEvent}
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
        const midnight = new Date()
        midnight.setHours(0, 0, 0, 0)
        const noon = new Date(midnight)
        noon.setHours(HOURS_IN_DAY / HALF)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)

        const customEvents: IConcreteEvent[] = [
            {
                accentClassName: 'bar',
                attributes: {},
                className: 'foo',
                end: noon,
                people: [],
                start: midnight
            },
            {
                accentClassName: 'bar',
                attributes: {},
                className: 'foo',
                end: tomorrow,
                people: [],
                start: noon
            },
            {
                accentClassName: 'quux',
                attributes: {},
                className: 'baz',
                end: tomorrow,
                people: [],
                start: noon
            },
            {
                accentClassName: 'quux',
                attributes: {},
                className: 'baz',
                end: tomorrow,
                people: [],
                start: noon
            }
        ]

        const component = mount(<GroupedDaysAroundView
            date={midnight}
            events={customEvents}
            swimlaneForEvent={swimlaneForEvent}
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

        customEvents.forEach(event =>
            expect(mappedSwimlaneForEvent(event, mappedSwimlanes).label)
                .toEqual(event.className)
        )
    })
})
