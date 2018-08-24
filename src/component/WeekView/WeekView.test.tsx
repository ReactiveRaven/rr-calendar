import {mount} from 'enzyme'
import * as React from 'react'
import {DAYS_IN_WEEK} from '../../constants'
import {WeekDayStart} from '../SmallCalendar/SmallCalendar'
import WeekView from './WeekView'

describe('WeekView', () => {
    it('should render without crashing', () => {
        expect(() => mount(<WeekView selectedDate={new Date()}/>)).not.toThrow()
    })

    it('should show seven daycolumns', () => {
        const component = mount(<WeekView selectedDate={new Date()}/>)
        expect(component.find('LargeCalendarDayColumn')).toHaveLength(DAYS_IN_WEEK)
    })

    it('should start the week at the correct day', () => {
        const mondayComponent = mount(
            <WeekView
                selectedDate={new Date('2000-12-31T23:59:59Z')}
                weekStartsOn={WeekDayStart.Monday}
            />
        )

        const mondayDateStrings = mondayComponent
            .find('LargeCalendarDayColumn')
            .map(wrapper => wrapper.prop('date') as Date)
            .map(date => date.toISOString())

        expect(mondayDateStrings)
            .toEqual([
                '2000-12-25T00:00:00.000Z',
                '2000-12-26T00:00:00.000Z',
                '2000-12-27T00:00:00.000Z',
                '2000-12-28T00:00:00.000Z',
                '2000-12-29T00:00:00.000Z',
                '2000-12-30T00:00:00.000Z',
                '2000-12-31T00:00:00.000Z',
            ])

        const sundayComponent = mount(
            <WeekView
                selectedDate={new Date('2000-12-31T23:59:59Z')}
                weekStartsOn={WeekDayStart.Sunday}
            />
        )

        const sundayDateStrings = sundayComponent
            .find('LargeCalendarDayColumn')
            .map(wrapper => wrapper.prop('date') as Date)
            .map(date => date.toISOString())

        expect(sundayDateStrings)
            .toEqual([
                '2000-12-31T00:00:00.000Z',
                '2001-01-01T00:00:00.000Z',
                '2001-01-02T00:00:00.000Z',
                '2001-01-03T00:00:00.000Z',
                '2001-01-04T00:00:00.000Z',
                '2001-01-05T00:00:00.000Z',
                '2001-01-06T00:00:00.000Z',
            ])
    })
})