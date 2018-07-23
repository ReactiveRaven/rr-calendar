import {mount, shallow} from 'enzyme'
import * as React from 'react'
import LargeCalendarDayColumn, {TESTING_CLASS_NAMES} from './LargeCalendarDayColumn'

describe('LargeCalendarDayColumn', () => {
    const KNOWN_DATE = new Date('2000-12-31T23:59:59Z')
    const weekdayFormatter = Intl.DateTimeFormat('en-GB', { weekday: 'long'}).format
    const dateFormatter = Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format

    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendarDayColumn date={KNOWN_DATE}/>)).not.toThrow()
    })

    describe('header', () => {
        it('should have a header', () => {
            expect(
                mount(<LargeCalendarDayColumn date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.header}`)
            )
                .toHaveLength(1)
        })

        it('should contain the current day of the week', () => {
            expect(
                mount(<LargeCalendarDayColumn
                    date={KNOWN_DATE}
                    weekdayFormatter={weekdayFormatter}
                />)
                    .text()
            )
                .toContain(weekdayFormatter(KNOWN_DATE))
        })

        it('should contain the current day of the month', () => {
            expect(
                mount(<LargeCalendarDayColumn date={KNOWN_DATE} dateFormatter={dateFormatter}/>)
                    .text()
            )
                .toContain(dateFormatter(KNOWN_DATE))
        })
    })

    describe('body', () => {
        it('should have a body', () => {
            expect(
                mount(<LargeCalendarDayColumn date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.body}`)
            )
                .toHaveLength(1)
        })

        it('should be divided into 24 cells, one per hour', () => {
            const HOURS_IN_DAY = 24
            expect(
                mount(<LargeCalendarDayColumn date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.hourCell}`)
            )
                .toHaveLength(HOURS_IN_DAY)
        })
    })
})