import {HOURS_IN_DAY} from '../constants'
import IConcreteEvent from '../model/IConcreteEvent'
import ISwimlane from '../model/ISwimlane'
import calculateSwimlanes from './calculateSwimlanes'

const HALF = 2

describe('calculateSwimlanes', () => {
    it('should be a function', () => {
        expect(calculateSwimlanes).toBeInstanceOf(Function)
    })

    it('should calculate the correct number of columns for a swimlane', () => {
        const midnight = new Date('2000-12-31T12:00:00Z')
        midnight.setHours(0, 0, 0, 0)
        const noon = new Date(midnight)
        noon.setHours(HOURS_IN_DAY / HALF)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(midnight.getDate() + 1)

        const events: IConcreteEvent[] = [
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: noon,
                start: midnight
            },
            {
                accentClassName: 'bar',
                className: 'foo',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            },
            {
                accentClassName: 'quux',
                className: 'baz',
                description: 'description',
                end: tomorrow,
                start: noon
            }
        ]

        expect(calculateSwimlanes(event => event.className, events))
            .toEqual([
                {
                    label: 'baz',
                    unitHeight: 2
                },
                {
                    label: 'foo',
                    unitHeight: 1
                }
            ] as ISwimlane[])
    })
})
