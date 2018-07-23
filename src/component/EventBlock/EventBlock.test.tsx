import {mount, ReactWrapper} from 'enzyme'
import * as React from 'react'
import * as Sinon from 'sinon'
import IConcreteEvent from '../../model/IConcreteEvent'
import msFrom, {TimeUnit} from '../../utility/msFrom'
import { undecorated as PersonPill } from '../PersonPill/PersonPill'
import TimeLabel from '../TimeLabel/TimeLabel'
import EventBlock from './EventBlock'

const three = 3

describe('EventBlock', () => {
    const START_DATE = new Date('2000-12-31T13:00:00Z')
    let EXAMPLE_EVENT: IConcreteEvent

    beforeEach(() => {
        EXAMPLE_EVENT = {
            accentClassName: 'accentClassName',
            attributes: {
                foo: 'bar'
            },
            className: 'className',
            end: new Date(START_DATE.getTime() + msFrom(three, TimeUnit.hour)),
            location: {
                name: 'Westminster Palace'
            },
            people: [
                {
                    name: 'John Smith'
                },
                {
                    name: 'Andrew Neil Other'
                },
                {
                    name: 'Cher'
                },
                {
                    name: '张伟'
                }
            ],
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

        it('should show a pill for each person attending', () => {
            expect(component.find(PersonPill)).toHaveLength(EXAMPLE_EVENT.people.length)
        })

        it('should show the location of the event', () => {
            expect(component.text()).toContain(EXAMPLE_EVENT.location!.name)
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

    describe('emphasise', () => {
        it('should not emphasise any field by default', () => {
            const component = mount(<EventBlock event={EXAMPLE_EVENT}/>)

            const fieldsToCheck = [
                'start',
                'end',
                'location',
                'attributes',
                'people'
            ]

            fieldsToCheck.forEach(field => {
                expect(component.find(`.${field}`).prop('className'))
                .not.toContain('important')
            })
        })

        it('should emphasise fields that are marked as true', () => {
            const component = mount(
                <EventBlock
                    event={EXAMPLE_EVENT}
                    emphasise={{start: true}}
                />
            )

            expect(component.find('.start').prop('className'))
                .toContain('important')
        })

        it('should not emphasise fields that are marked as false', () => {
            const component = mount(
                <EventBlock
                    event={EXAMPLE_EVENT}
                    emphasise={{start: false}}
                />
            )

            expect(component.find('.start').prop('className'))
                .toEqual('start')
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
