import { shallow } from 'enzyme'
import * as React from 'react'
import * as sinon from 'sinon'
import TimeLabel from './TimeLabel'

describe('TimeLabel', () => {
    const NYE_DATE = new Date('2000-12-31T23:59:59')

    it('Should render without crashing', () => {
        expect(() => shallow(<TimeLabel date={new Date()} />)).not.toThrow()
    })

    it('should be a span', () => {
        expect(shallow(<TimeLabel date={new Date()}/>).name()).toEqual('span')
    })

    it('should display the time', () => {
        expect(shallow(<TimeLabel date={NYE_DATE}/>).text()).toContain('23:59')
        expect(shallow(<TimeLabel date={NYE_DATE}/>).text()).not.toContain('2000')
    })

    it('should allow overriding the formatter', () => {
        const EXAMPLE_STRING = 'hello world'
        const spy = sinon.spy(() => EXAMPLE_STRING)

        expect(shallow(<TimeLabel date={NYE_DATE} formatter={spy} />).text())
            .toContain(EXAMPLE_STRING)
        expect(spy.args).toEqual([[NYE_DATE]])
    })
})