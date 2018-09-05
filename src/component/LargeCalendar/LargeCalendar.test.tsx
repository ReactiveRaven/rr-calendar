import {mount, shallow} from 'enzyme'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import LargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/LargeCalendarViewConfig'
import EventBlock from '../EventBlock/EventBlock'
import LargeCalendar from './LargeCalendar'

describe('LargeCalendar', () => {
    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendar date={new Date()} events={[]}/>)).not.toThrow()
    })

    it('should show a WeekView by default', () => {
        const component = mount(<LargeCalendar date={new Date()} events={[]}/>)

        expect(component.find('WeekView')).toHaveLength(1)
    })

    it('should pass down emphasise key properly', () => {
        const emphasiseObject = {}
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            emphasise={emphasiseObject}
        />)

        expect(component.find('WeekView').first().prop('emphasise'))
            .toBe(emphasiseObject)
    })

    it('should pass down display key properly', () => {
        const displayObject = {}
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            display={displayObject}
        />)

        expect(component.find('WeekView').first().prop('display'))
            .toBe(displayObject)
    })

    it('should pass down date key properly', () => {
        const date = new Date
        const component = mount(<LargeCalendar
            date={date}
            events={[]}
        />)

        expect(component.find('WeekView').first().prop('date'))
            .toBe(date)
    })

    it('should pass down events key properly', () => {
        const events: IConcreteEvent[] = []
        const component = mount(<LargeCalendar
            date={new Date()}
            events={events}
        />)

        expect(component.find('WeekView').first().prop('events'))
            .toBe(events)
    })

    it('should pass down i18nconfig properly', () => {
        const i18nConfig = {}
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            i18nConfig={i18nConfig}
        />)

        expect(component.find('WeekView').first().prop('i18nConfig'))
            .toBe(i18nConfig)
    })

    it('should pass down delegate properly', () => {
        const delegate = {}
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            delegate={delegate}
        />)

        expect(component.find('WeekView').first().prop('delegate'))
            .toBe(delegate)
    })

    it('should pass down renderEvent properly', () => {
        const renderEvent: EventRenderer = (options) => <EventBlock {...options} />

        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            renderEvent={renderEvent}
        />)

        expect(component.find('WeekView').first().prop('renderEvent'))
            .toBe(renderEvent)
    })

    it('should allow changing the view type', () => {
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            viewConfig={LargeCalendarViewConfig.dayView()}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('DaysAroundView')).toHaveLength(1)
    })

    it('should support grouped week view', () => {
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            viewConfig={LargeCalendarViewConfig.groupedWeekView({
                swimlaneForEvent: (event) => event.className,
            })}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('GroupedWeekView')).toHaveLength(1)
    })

    it('should support grouped day view', () => {
        const component = mount(<LargeCalendar
            date={new Date()}
            events={[]}
            viewConfig={LargeCalendarViewConfig.groupedDayView({
                swimlaneForEvent: (event) => event.className,
            })}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('GroupedDaysAroundView')).toHaveLength(1)
    })
})
