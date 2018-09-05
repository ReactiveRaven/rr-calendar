import {mount} from 'enzyme'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import EventBlock from '../EventBlock/EventBlock'
import VerticalSchedulerColumn, { TESTING_CLASS_NAMES } from './VerticalSchedulerColumn'

describe('VerticalSchedulerColumn', () => {
    const KNOWN_DATE = new Date('2000-12-31T23:59:59Z')
    const weekDayFormatter = Intl.DateTimeFormat('en-GB', { weekday: 'long'}).format
    const monthDayFormatter = Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format
    const classes = Object.freeze({})
    const defaultProps = {
        classes,
        date: KNOWN_DATE,
        events: [],
        swimlaneForEvent: (event: IConcreteEvent, swimlanes: ISwimlane[]) => swimlanes[0]!,
        swimlanes: [{
            label: 'foo',
            unitHeight: 1
        }],
    }

    it('should render without crashing', () => {
        expect(() => mount(<VerticalSchedulerColumn {...defaultProps} />)).not.toThrow()
    })

    describe('header', () => {
        it('should have a header', () => {
            expect(
                mount(<VerticalSchedulerColumn  {...defaultProps} />)
                    .find(`.${TESTING_CLASS_NAMES.header}`)
            )
                .toHaveLength(1)
        })

        it('should contain the current day of the week', () => {
            expect(
                mount(<VerticalSchedulerColumn
                    {...defaultProps}
                    i18nConfig={{weekDayFormatter}}
                />)
                    .text()
            )
                .toContain(weekDayFormatter(KNOWN_DATE))
        })

        it('should contain the current day of the month', () => {
            expect(
                mount(<VerticalSchedulerColumn
                    {...defaultProps}
                    i18nConfig={{monthDayFormatter}}
                />)
                    .text()
            )
                .toContain(monthDayFormatter(KNOWN_DATE))
        })
    })

    describe('body', () => {
        it('should have a body', () => {
            expect(
                mount(<VerticalSchedulerColumn {...defaultProps}/>)
                    .find(`.${TESTING_CLASS_NAMES.body}`)
            )
                .toHaveLength(1)
        })

        it(`should be divided into ${HOURS_IN_DAY} cells, one per hour`, () => {
            expect(
                mount(<VerticalSchedulerColumn {...defaultProps}/>)
                    .find(`.${TESTING_CLASS_NAMES.hourCell}`)
            )
                .toHaveLength(HOURS_IN_DAY)
        })

        it('should render events into the body', () => {
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
            />)

            expect(component.find('EventBlock')).toHaveLength(1)
        })

        it('should ignore events outside of today', () => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: yesterday,
                    people: [],
                    start: yesterday
                }
            ]
            expect(
                mount(
                    <VerticalSchedulerColumn {...defaultProps} date={new Date()} events={events}/>
                )
                    .find('EventBlock')
            )
                .toHaveLength(0)
        })

        it('should pass emphasise down to events', () => {
            const emphasisObject = {}
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
                emphasise={emphasisObject}
            />)

            expect(
                component
                    .find('EventBlock')
                    .first()
                    .prop('emphasise')
            )
                .toEqual(emphasisObject)
        })

        it('should pass display down to events', () => {
            const displayObject = {}
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
                display={displayObject}
            />)

            expect(
                component
                    .find('EventBlock')
                    .first()
                    .prop('display')
            )
                .toEqual(displayObject)
        })

        it('should pass i18nConfig down to events', () => {
            const i18nConfig = {}
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
                i18nConfig={i18nConfig}
            />)

            expect(
                component
                    .find('EventBlock')
                    .first()
                    .prop('i18nConfig')
            )
                .toEqual(i18nConfig)
        })

        it('should pass delegate down to events', () => {
            const delegate = {}
            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
                delegate={delegate}
            />)

            expect(
                component
                    .find('EventBlock')
                    .first()
                    .prop('delegate')
            )
                .toEqual(delegate)
        })

        it('should accept custom event rendering', () => {
            const overriddenClassName = 'OVERRIDDEN_CLASS_NAME'
            const renderer: EventRenderer = (options) => (
                <EventBlock {...options} className={overriddenClassName} />
            )

            const events: IConcreteEvent[] = [
                {
                    accentClassName: 'ACCENT_CLASS_NAME',
                    attributes: {},
                    className: 'CLASS_NAME',
                    end: new Date(),
                    people: [],
                    start: new Date()
                }
            ]
            const component = mount(<VerticalSchedulerColumn
                {...defaultProps}
                date={new Date()}
                events={events}
                renderEvent={renderer}
            />)

            expect(
                component
                    .find('EventBlock')
                    .first()
                    .prop('className')
            )
                .toEqual(overriddenClassName)
        })
    })

    describe('column', () => {
        it('should contain a swimlane element for each swimlane passed in', () => {
            const swimlanes: ISwimlane[] = [
                {
                    label: 'Foo',
                    unitHeight: 1
                },
                {
                    label: 'Bar',
                    unitHeight: 1
                }
            ]

            expect(
                mount(<VerticalSchedulerColumn {...defaultProps} swimlanes={swimlanes}/>)
                    .find(`.${TESTING_CLASS_NAMES.swimlane}`)
            )
                .toHaveLength(swimlanes.length)
        })
    })
})
