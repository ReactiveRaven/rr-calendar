import {mount, shallow} from 'enzyme'
import * as React from 'react'
import LargeCalendar from './LargeCalendar'

describe('LargeCalendar', () => {
    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendar/>)).not.toThrow()
    })

    it('should contain columns', () => {
        const component = mount(<LargeCalendar/>)
        expect(component.find('LargeCalendarDayColumn').length).toBeGreaterThan(0)
    })
})