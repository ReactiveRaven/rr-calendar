import {mount} from 'enzyme'
import * as React from 'react'
import {DAYS_IN_WEEK} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import IConcreteEvent from '../../model/IConcreteEvent'
import {TESTING_CLASS_NAMES} from '../LargeCalendarDayColumn/LargeCalendarDayColumn'
import WeekView from './WeekView'

describe('WeekView', () => {
    it('should render without crashing', () => {
        expect(() => mount(<WeekView date={new Date()} events={[]}/>)).not.toThrow()
    })

    it('should show seven day-columns', () => {
        const component = mount(<WeekView date={new Date()} events={[]}/>)
        expect(component.find('LargeCalendarDayColumn')).toHaveLength(DAYS_IN_WEEK)
    })

    it('should show the correct week around the selected date', () => {
        const component = mount(<WeekView
            date={new Date('2000-12-31T23:59:59.999Z')}
            weekDayStart={WeekDayStart.Sunday}
            events={[]}
        />)

        const expectedStrings = ['Sun31', 'Mon1', 'Tue2', 'Wed3', 'Thu4', 'Fri5', 'Sat6']

        component
            .find('LargeCalendarDayColumn')
            .find(`.${TESTING_CLASS_NAMES.header}`)
            .map(wrapper => wrapper.text())
            .forEach((text, index) => expect(text).toEqual(expectedStrings[index]))
    })

    it('should show the correct week around the selected date by default', () => {
        const component = mount(<WeekView
            date={new Date('2000-12-31T23:59:59.999Z')}
            events={[]}
        />)

        const expectedStrings = ['Mon25', 'Tue26', 'Wed27', 'Thu28', 'Fri29', 'Sat30', 'Sun31']

        component
            .find('LargeCalendarDayColumn')
            .find(`.${TESTING_CLASS_NAMES.header}`)
            .map(wrapper => wrapper.text())
            .forEach((text, index) => expect(text).toEqual(expectedStrings[index]))
    })

    it('should pass down emphasis keys properly', () => {
        const emphasisObject = {}

        const component = mount(<WeekView
            date={new Date()}
            emphasise={emphasisObject}
            events={[]}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('emphasise')
        )
            .toEqual(emphasisObject)
    })

    it('should pass down display keys properly', () => {
        const displayObject = {}

        const component = mount(<WeekView
            date={new Date()}
            display={displayObject}
            events={[]}
        />)

        expect(
            component
                .find('LargeCalendarDayColumn')
                .first()
                .prop('display')
        )
            .toEqual(displayObject)
    })

    it('should pass down events keys properly', () => {
        const events: IConcreteEvent[] = []

        const component = mount(<WeekView
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
            .toEqual(events)
    })

    it('should pass i18nConfig key down properly', () => {
        const i18nConfig = {}

        const component = mount(<WeekView
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
            .toEqual(i18nConfig)
    })

    it('should pass delegate down properly', () => {
        const delegate = {}

        const component = mount(<WeekView
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
})
