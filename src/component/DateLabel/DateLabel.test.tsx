import {shallow} from 'enzyme'
import * as React from 'react'
import DateLabel from './DateLabel'

describe('DateLabel', () => {
    const NYE_DATE = new Date('2000-12-31T23:59:59Z')
    const NYD_DATE = new Date('2001-01-01T00:00:00Z')

    it('should display the current month day number', () => {
        const defaultFormatter = Intl.DateTimeFormat(navigator.language, {day: 'numeric'}).format

        const componentNYE = shallow(<DateLabel date={NYE_DATE} selected={false} />)
        const componentNYD = shallow(<DateLabel date={NYD_DATE} selected={false} />)

        expect(componentNYE.text()).toContain(defaultFormatter(NYE_DATE))
        expect(componentNYD.text()).toContain(defaultFormatter(NYD_DATE))
    })

    it('should allow formatting the date with a custom formatter', () => {
        const customFormatter = Intl.DateTimeFormat(navigator.language, {day: '2-digit'}).format

        const componentNYE = shallow(<DateLabel
            date={NYE_DATE}
            selected={false}
            formatter={customFormatter}
        />)
        const componentNYD = shallow(<DateLabel
            date={NYD_DATE}
            selected={false}
            formatter={customFormatter}
        />)

        expect(componentNYE.text()).toContain('31')
        expect(componentNYD.text()).toContain('01')
    })
})