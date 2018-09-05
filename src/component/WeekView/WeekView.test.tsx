import {mount} from 'enzyme'
import * as React from 'react'
import {DAYS_IN_WEEK} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import EventBlock from '../EventBlock/EventBlock'
import {TESTING_CLASS_NAMES} from '../LargeCalendarDayColumn/LargeCalendarDayColumn'
import WeekView from './WeekView'

describe('WeekView', () => {
    const date = new Date()
    const defaultProps = {
        date,
        events: []
    }

    it('should render without crashing', () => {
        expect(() => mount(<WeekView {...defaultProps}/>)).not.toThrow()
    })

    it('should show seven day-columns', () => {
        const component = mount(<WeekView {...defaultProps}/>)
        expect(component.find('LargeCalendarDayColumn')).toHaveLength(DAYS_IN_WEEK)
    })

    it('should show the correct week around the selected date', () => {
        const component = mount(<WeekView
            {...defaultProps}
            date={new Date('2000-12-31T23:59:59.999Z')}
            weekDayStart={WeekDayStart.Sunday}
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
            {...defaultProps}
            date={new Date('2000-12-31T23:59:59.999Z')}
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
            {...defaultProps}
            emphasise={emphasisObject}
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
            {...defaultProps}
            display={displayObject}
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
            {...defaultProps}
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
            {...defaultProps}
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

    it('should pass renderEvent down properly', () => {
        const renderEvent: EventRenderer = (options) => <EventBlock {...options} />

        const component = mount(<WeekView
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
