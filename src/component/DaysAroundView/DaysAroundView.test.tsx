import {mount} from 'enzyme'
import * as React from 'react'
import {TESTING_CLASS_NAMES} from '../LargeCalendarDayColumn/LargeCalendarDayColumn'
import DaysAroundView from './DaysAroundView'
import IConcreteEvent from '../../model/IConcreteEvent'

describe('DaysAroundView', () => {
    it('should render without crashing', () => {
        expect(() => mount(<DaysAroundView date={new Date()} events={[]} />)).not.toThrow()
    })

    it('should show the requested number of days before/after the current date', () => {
        const now = new Date()

        expect(
            mount(<DaysAroundView date={now} events={[]}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(1)

        const beforeAndToday = 2
        expect(
            mount(<DaysAroundView before={1} date={now} events={[]}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(beforeAndToday)

        const afterAndToday = 2
        expect(
            mount(<DaysAroundView after={1} date={now} events={[]}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(afterAndToday)

        const beforeAndAfterAndToday = 3
        expect(
            mount(<DaysAroundView after={1} before={1} date={now} events={[]}/>)
                .find('LargeCalendarDayColumn')
        )
            .toHaveLength(beforeAndAfterAndToday)
    })

    it('should show the correct requested dates', () => {
        const date = new Date('2000-12-31T23:59:59')

        const dateStrings = ['Fri29', 'Sat30', 'Sun31', 'Mon1', 'Tue2']

        const numAround = 2
        const component = mount(<DaysAroundView
            after={numAround}
            before={numAround}
            date={date}
            events={[]}
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
                date={new Date()}
                emphasise={emphasisObject}
                events={[]}
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
                date={new Date()}
                display={displayObject}
                events={[]}
            />)
                .find('LargeCalendarDayColumn')
                .prop('display')
        )
            .toBe(displayObject)
    })

    it('should pass i18nConfig key down properly', () => {
        const i18nConfig = {}

        const component = mount(<DaysAroundView
            date={new Date()}
            display={{}}
            events={[]}
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
            date={new Date()}
            display={{}}
            events={[]}
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
            date={new Date()}
            display={{}}
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
})
