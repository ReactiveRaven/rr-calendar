import {mount, ReactWrapper} from 'enzyme'
import * as React from 'react'
import * as Sinon from 'sinon'
import IConcreteEvent from '../../model/IConcreteEvent'
import msFrom, {TimeUnit} from '../../utility/msFrom'
import TimeLabel from '../TimeLabel/TimeLabel'
import EventBlock from './EventBlock'

const three = 3

describe('EventBlock', () => {
    const START_DATE = new Date('2000-12-31T13:00:00Z')
    let EXAMPLE_EVENT: IConcreteEvent

    beforeEach(() => {
        EXAMPLE_EVENT = {
            accentClassName: 'accentClassName',
            className: 'className',
            description: 'title',
            end: new Date(START_DATE.getTime() + msFrom(three, TimeUnit.hour)),
            start: START_DATE
        }
    })

    it('should render without crashing', () => {
        expect(() => <EventBlock event={EXAMPLE_EVENT}/>).not.toThrow()
    })

    describe('default', () => {
        let component: ReactWrapper

        beforeEach(() => {
            component = mount(<EventBlock event={EXAMPLE_EVENT}/>)
        })

        it('should show the start and end times as time labels', () => {
            expect(component.find(TimeLabel)).toHaveLength(['start', 'end'].length)
        })

        describe('start time', () => {
            it('should have a time label element showing the start time', () => {
                expect(component.find(TimeLabel).first().text()).toEqual('13:00')
            })
        })

        describe('end time', () => {
            it('should have a time label element showing the end time', () => {
                expect(component.find(TimeLabel).last().text()).toEqual('16:00')
            })
        })
    })

    describe('interaction', () => {
        let delegate: {
            onFocusEvent: Sinon.SinonSpy
            onHoverEvent: Sinon.SinonSpy
            onSelectEvent: Sinon.SinonSpy
        }

        beforeEach(() => {
            delegate = {
                onFocusEvent: Sinon.spy(),
                onHoverEvent: Sinon.spy(),
                onSelectEvent: Sinon.spy(),
            }
        })

        it('should trigger delegate on click', () => {
            const component = mount(<EventBlock
                event={EXAMPLE_EVENT}
                delegate={delegate}
            />)

            component.simulate('click')

            expect(delegate.onSelectEvent.args).toHaveLength(1)
        })

        it('should trigger delegate on hover', () => {
            const component = mount(<EventBlock
                event={EXAMPLE_EVENT}
                delegate={delegate}
            />)

            component.simulate('mouseEnter')

            expect(delegate.onHoverEvent.args).toHaveLength(1)
        })
    })
})
