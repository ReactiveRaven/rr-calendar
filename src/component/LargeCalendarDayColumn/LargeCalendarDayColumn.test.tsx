import {mount, shallow} from 'enzyme'
import * as React from 'react'
import IConcreteEvent from '../../model/IConcreteEvent'
import LargeCalendarDayColumn, {TESTING_CLASS_NAMES} from './LargeCalendarDayColumn'

describe('LargeCalendarDayColumn', () => {
    const KNOWN_DATE = new Date('2000-12-31T23:59:59Z')
    const weekDayFormatter = Intl.DateTimeFormat('en-GB', { weekday: 'long'}).format
    const monthDayFormatter = Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format
    const classes = Object.freeze({
    })
    const defaultProps = { classes, events: [] }

    it('should render without crashing', () => {
        expect(() => shallow(<LargeCalendarDayColumn {...defaultProps} date={KNOWN_DATE}/>))
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
            const component = mount(<LargeCalendarDayColumn
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
                    <LargeCalendarDayColumn date={new Date()} events={events}/>
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
            const component = mount(<LargeCalendarDayColumn
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
            const component = mount(<LargeCalendarDayColumn
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
            const component = mount(<LargeCalendarDayColumn
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
            const component = mount(<LargeCalendarDayColumn
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
    })
})
