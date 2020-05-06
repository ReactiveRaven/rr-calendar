import {mount, shallow} from 'enzyme'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import IConcreteEvent from '../../model/IConcreteEvent'
import EventBlock from '../EventBlock/EventBlock'
import LargeCalendarDayColumn, {
    ILargeCalendarDayColumnProps,
    TESTING_CLASS_NAMES
} from './LargeCalendarDayColumn'

describe('LargeCalendarDayColumn', () => {
    const KNOWN_DATE = new Date('2000-12-31T23:59:59Z')
    const weekDayFormatter = Intl.DateTimeFormat('en-GB', { weekday: 'long'}).format
    const monthDayFormatter = Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format
    const classes = Object.freeze({})
    let defaultProps: ILargeCalendarDayColumnProps & {classes: object}
    let exampleEvent: IConcreteEvent

    beforeEach(() => {
        exampleEvent = {
            accentClassName: 'ACCENT_CLASS_NAME',
            attributes: {},
            className: 'CLASS_NAME',
            end: new Date('2000-12-31T17:30:00Z'),
            people: [],
            start: new Date('2000-12-31T09:00:00Z')
        }

        defaultProps = {
            classes,
            date: KNOWN_DATE,
            events: [ exampleEvent ],
            now: { date: KNOWN_DATE, timezone: 'UTC' }
        }
    })

    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendarDayColumn {...defaultProps}/>))
            .not.toThrow()
    })

    describe('header', () => {
        it('should have a header', () => {
            expect(
                mount(<LargeCalendarDayColumn  {...defaultProps} date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.header}`)
            )
                .toHaveLength(1)
        })

        it('should contain the current day of the week', () => {
            expect(
                mount(<LargeCalendarDayColumn
                    {...defaultProps}
                    date={KNOWN_DATE}
                    i18nConfig={{weekDayFormatter}}
                />)
                    .text()
            )
                .toContain(weekDayFormatter(KNOWN_DATE))
        })

        it('should contain the current day of the month', () => {
            expect(
                mount(<LargeCalendarDayColumn
                    {...defaultProps}
                    date={KNOWN_DATE}
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
                mount(<LargeCalendarDayColumn {...defaultProps} date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.body}`)
            )
                .toHaveLength(1)
        })

        it('should be divided into 24 cells, one per hour', () => {
            const HOURS_IN_DAY = 24
            expect(
                mount(<LargeCalendarDayColumn {...defaultProps} date={KNOWN_DATE}/>)
                    .find(`.${TESTING_CLASS_NAMES.hourCell}`)
            )
                .toHaveLength(HOURS_IN_DAY)
        })

        it('should render events into the body', () => {
            const events: IConcreteEvent[] = [exampleEvent]
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
                events={events}
            />)

            expect(component.find('EventBlock')).toHaveLength(1)
        })

        it('should ignore events outside of today', () => {
            const yesterday = new Date(defaultProps.date)
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
                    <LargeCalendarDayColumn {...defaultProps} events={events}/>
                )
                    .find('EventBlock')
            )
                .toHaveLength(0)
        })

        it('should pass emphasise down to events', () => {
            const emphasisObject = {}
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
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
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
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
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
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
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
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
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
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

        it('should have a shade to highlight the past', () => {
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
            />)

            expect(
                component
                    .find(`.${TESTING_CLASS_NAMES.shade}`)
            )
                .toHaveLength(1)
        })

        it('should pull the shade down fully when the column is in the past', () => {
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
                now={{
                    date: new Date(),
                    timezone: 'UTC'
                }}
            />)

            expect(
                component
                    .find(`.${TESTING_CLASS_NAMES.shade}`)
                    .first()
                    .prop('style')!
                    .height
            )
                .toEqual('100%')
        })

        it('should not pull the shade down when the column is in the future', () => {
            const future = new Date()
            future.setDate(future.getDate() + 1)
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
                date={future}
            />)

            expect(
                component
                    .find(`.${TESTING_CLASS_NAMES.shade}`)
                    .first()
                    .prop('style')!
                    .height
            )
                .toEqual('0%')
        })

        it('should handle having an alternate view', () => {
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
                alternate={true}
            />)

            expect(
                component
                    .find(`.${TESTING_CLASS_NAMES.cellAlternate}`)
                    .first()
            )
                .toHaveLength(1)
        })

        it('should handle having an non-alternate view', () => {
            const component = mount(<LargeCalendarDayColumn
                {...defaultProps}
            />)

            expect(
                component
                    .find(`.${TESTING_CLASS_NAMES.cellAlternate}`)
                    .first()
            )
                .toHaveLength(0)
        })
    })
})
