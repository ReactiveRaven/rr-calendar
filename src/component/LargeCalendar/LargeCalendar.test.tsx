import {mount, shallow} from 'enzyme'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import LargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/LargeCalendarViewConfig'
import EventBlock from '../EventBlock/EventBlock'
import LargeCalendar, {ILargeCalendarOwnProps} from './LargeCalendar'

describe('LargeCalendar', () => {
    let defaultProps: ILargeCalendarOwnProps

    beforeEach(() => {
        defaultProps = {
            date: new Date('2000-12-31T09:00:00Z'),
            events: [],
            now: { date: new Date('2000-12-31-T09:00:00Z'), timezone: 'UTC' }
        }
    })

    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendar
            {...defaultProps}
        />)).not.toThrow()
    })

    it('should show a WeekView by default', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
        />)

        expect(component.find('WeekView')).toHaveLength(1)
    })

    it('should pass down display key properly', () => {
        const displayObject = {}
        const component = mount(<LargeCalendar
            {...defaultProps}
            display={displayObject}
        />)

        expect(component.find('WeekView').first().prop('display'))
            .toBe(displayObject)
    })

    it('should pass down date key properly', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
        />)

        expect(component.find('WeekView').first().prop('date'))
            .toBe(defaultProps.date)
    })

    it('should pass down events key properly', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
        />)

        expect(component.find('WeekView').first().prop('events'))
            .toBe(defaultProps.events)
    })

    it('should pass down i18nconfig properly', () => {
        const i18nConfig = {}
        const component = mount(<LargeCalendar
            {...defaultProps}
            i18nConfig={i18nConfig}
        />)

        expect(component.find('WeekView').first().prop('i18nConfig'))
            .toBe(i18nConfig)
    })

    it('should pass down delegate properly', () => {
        const delegate = {}
        const component = mount(<LargeCalendar
            {...defaultProps}
            delegate={delegate}
        />)

        expect(component.find('WeekView').first().prop('delegate'))
            .toBe(delegate)
    })

    it('should pass down renderEvent properly', () => {
        const renderEvent: EventRenderer = (options) => <EventBlock {...options} />

        const component = mount(<LargeCalendar
            {...defaultProps}
            renderEvent={renderEvent}
        />)

        expect(component.find('WeekView').first().prop('renderEvent'))
            .toBe(renderEvent)
    })

    it('should allow changing the view type', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
            viewConfig={LargeCalendarViewConfig.dayView()}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('DaysAroundView')).toHaveLength(1)
    })

    it('should support grouped week view', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
            viewConfig={LargeCalendarViewConfig.groupedWeekView({
                swimlaneForEvent: (event) => event.className,
            })}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('GroupedWeekView')).toHaveLength(1)
    })

    it('should support grouped day view', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
            viewConfig={LargeCalendarViewConfig.groupedDayView({
                swimlaneForEvent: (event) => event.className,
            })}
        />)

        expect(component.find('WeekView')).toHaveLength(0)
        expect(component.find('GroupedDaysAroundView')).toHaveLength(1)
    })

    it('should support DaysAround view', () => {
        const component = mount(<LargeCalendar
            {...defaultProps}
            viewConfig={LargeCalendarViewConfig.daysAroundView({ before: 1, after: 1 })}
        />)

        expect(component.find('LargeCalendarDayColumn'))
            .toHaveLength(['before', 'today', 'after'].length)
    })
})
