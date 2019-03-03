import eventPositioning from './eventPositioning'

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
        const end = new Date(date)
        end.setDate(date.getDate() + 1)
        const columns = 1
        const index = 0
        expect(eventPositioning(
            {
                end,
                start
            },
            {
                columns,
                index
            },
            date
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
        expect(eventPositioning(
            {
                end,
                start
            },
            {
                columns,
                index
            },
            date
        ))
            .toEqual({
                height: 'calc(100% / 24 * 24)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 0)',
                width: `calc((95% / ${columns}))`
            })
    })

    it('should handle events extending outside of the selected date', () => {
        const date = KNOWN_DATE
        const start = new Date(date)
        start.setDate(start.getDate() - 1)
        start.setHours(0, 0, 0, 0)
        const end = new Date(date)
        end.setDate(date.getDate() + 2)
        const columns = 3
        const index = 1
        expect(eventPositioning(
            {
                end,
                start
            },
            {
                columns,
                index
            },
            date
        ))
            .toEqual({
                height: 'calc(100% / 24 * 24)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 0)',
                width: `calc((95% / ${columns}))`
            })
    })

    it('should quantise to quarter-hours', () => {
        const date = KNOWN_DATE
        const start = new Date(date)
        start.setHours(12, 35, 0, 0)
        const end = new Date(date)
        end.setHours(14, 12, 0, 0)
        const columns = 3
        const index = 1
        expect(eventPositioning(
            {
                end,
                start
            },
            {
                columns,
                index
            },
            date
        ))
            .toEqual({
                height: 'calc(100% / 24 * 1.75)',
                left: `calc(2.5% + (95% / ${columns} * ${index}))`,
                top: 'calc(100% / 24 * 12.5)',
                width: `calc((95% / ${columns}))`
            })
    })
})
// tslint:enable:no-magic-numbers
