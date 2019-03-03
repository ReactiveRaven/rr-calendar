import {mount} from 'enzyme'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import EventBlock from '../EventBlock/EventBlock'
import {TESTING_CLASS_NAMES} from '../LargeCalendarDayColumn/LargeCalendarDayColumn'
import DaysAroundView from './DaysAroundView'

describe('DaysAroundView', () => {
    const date = new Date('2000-12-31T12:00:00Z')
    const defaultProps = {
        date,
        events: []
    }

    it('should render without crashing', () => {
        expect(() => mount(<DaysAroundView {...defaultProps} />)).not.toThrow()
    })

    it('should show the requested number of days before/after the current date', () => {
        expect(
            mount(<DaysAroundView {...defaultProps}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(1)

        const beforeAndToday = 2
        expect(
            mount(<DaysAroundView {...defaultProps} before={1} />)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(beforeAndToday)

        const afterAndToday = 2
        expect(
            mount(<DaysAroundView {...defaultProps} after={1} />)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(afterAndToday)

        const beforeAndAfterAndToday = 3
        expect(
            mount(<DaysAroundView {...defaultProps} after={1} before={1}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(beforeAndAfterAndToday)
    })

    it('should show the correct requested dates', () => {
        const knownDate = new Date('2000-12-31T23:59:59')

        const dateStrings = ['Fri29', 'Sat30', 'Sun31', 'Mon1', 'Tue2']

        const numAround = 2
        const component = mount(<DaysAroundView
            {...defaultProps}
            after={numAround}
            before={numAround}
            date={knownDate}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .find(`.${TESTING_CLASS_NAMES.header}`)
                .map(wrapper => wrapper.text())
        )
            .toEqual(dateStrings)
    })

    it('should pass emphasise key down as expected', () => {
        const emphasisObject = {}

        expect(
            mount(<DaysAroundView
                {...defaultProps}
                emphasise={emphasisObject}
            />)
                .find('LargeCalendarDayColumn')
                .prop('emphasise')
        )
            .toBe(emphasisObject)
    })

    it('should pass display key down as expected', () => {
        const displayObject = {}

        expect(
            mount(<DaysAroundView
                {...defaultProps}
                display={displayObject}
            />)
                .find('LargeCalendarDayColumn')
                .prop('display')
        )
            .toBe(displayObject)
    })

    it('should pass i18nConfig key down properly', () => {
        const i18nConfig = {}

        const component = mount(<DaysAroundView
            {...defaultProps}
            i18nConfig={i18nConfig}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('i18nConfig')
        )
            .toBe(i18nConfig)
    })

    it('should pass delegate down properly', () => {
        const delegate = {}

        const component = mount(<DaysAroundView
            {...defaultProps}
            delegate={delegate}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('delegate')
        )
            .toBe(delegate)
    })

    it('should pass events down properly', () => {
        const events: IConcreteEvent[] = []

        const component = mount(<DaysAroundView
            {...defaultProps}
            events={events}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('events')
        )
            .toBe(events)
    })

    it('should pass renderEvent down properly', () => {
        const renderEvent: EventRenderer = (options) => <EventBlock {...options} />

        const component = mount(<DaysAroundView
            {...defaultProps}
            renderEvent={renderEvent}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('renderEvent')
        )
            .toBe(renderEvent)
    })
})
