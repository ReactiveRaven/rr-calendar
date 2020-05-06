import eventPositioning, { quantise } from './eventPositioning'
import Range from './range/Range'

// tslint:disable:no-magic-numbers
describe('eventPositioning', () => {
    const KNOWN_DATE = new Date('2000-12-31T12:00:00Z')

    it('should be a function', () => {
        expect(eventPositioning).toBeInstanceOf(Function)
    })

    it('should return positioning within a day as expected', () => {
        const date = KNOWN_DATE
        const start = new Date(date)
        start.setHours(0, 0, 0, 0)
        const end = new Date(start)
        end.setDate(date.getDate() + 1)
        const columns = 1
        const index = 0
        expect(eventPositioning(
            {
                columns,
                event: Range.fromToLessThan(start, end),
                index,
                range: Range.fromToLessThan(start, end)
            },
        ))
            .toEqual({
                height: 'calc(100% / 24 * 24)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 0)',
                width: `calc((95% / ${columns}))`
            })
    })

    it('should handle columns properly', () => {
        const date = KNOWN_DATE
        const start = new Date(date)
        start.setHours(0, 0, 0, 0)
        const end = new Date(date)
        end.setDate(date.getDate() + 1)
        const columns = 3
        const index = 1
        expect(eventPositioning({
            columns,
            event: Range.fromToLessThan(start, end),
            index,
            range: Range.fromToLessThan(start, end)
        }))
            .toEqual({
                height: 'calc(100% / 24 * 24)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 0)',
                width: `calc((95% / ${columns}))`
            })
    })

    it('should handle events extending outside of the selected date', () => {
        const date = KNOWN_DATE
        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const start = new Date(date)
        start.setDate(start.getDate() - 1)
        start.setHours(0, 0, 0, 0)
        const end = new Date(date)
        end.setDate(date.getDate() + 2)
        const columns = 3
        const index = 1
        expect(eventPositioning({
            columns,
            event: Range.fromToLessThan(start, end),
            index,
            range: Range.fromToLessThan(midnight, tomorrow)
        }))
            .toEqual({
                height: 'calc(100% / 24 * 24)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 0)',
                width: `calc((95% / ${columns}))`
            })
    })

    it('should quantise to quarter-hours', () => {
        const date = KNOWN_DATE
        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const tomorrow = new Date(midnight)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const start = new Date(date)
        start.setHours(12, 35, 0, 0)
        const end = new Date(date)
        end.setHours(14, 12, 0, 0)
        const columns = 3
        const index = 1
        expect(eventPositioning({
            columns,
            event: Range.fromToLessThan(start, end),
            index,
            range: Range.fromToLessThan(midnight, tomorrow)
        }))
            .toEqual({
                height: 'calc(100% / 24 * 1.75)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 12.5)',
                width: `calc((95% / ${columns}))`
            })
    })
})

describe('quantise', () => {
    it('should round as expected', () => {
        expect(
            quantise(10,5)
        )
            .toEqual(10)

        expect(
            quantise(13, 4)
        )
            .toEqual(12)

        expect(
            quantise(14, 4)
        )
            .toEqual(16)

        expect(
            quantise(35, 15)
        )
            .toEqual(30)
    })
})
// tslint:enable:no-magic-numbers
