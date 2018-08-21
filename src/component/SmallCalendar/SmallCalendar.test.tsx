import {mount, ReactWrapper} from 'enzyme'
import * as React from 'react'
import * as Sinon from 'sinon'
import WeekDayStart from '../../enum/WeekDayStart'
import SmallCalendar, {
    ISmallCalendarState,
    TESTING_CLASS_NAMES,
    undecorated as SmallCalendarUndecorated,
} from './SmallCalendar'

describe('SmallCalendar', () => {
    const BODY_SELECTOR = `Grid.${TESTING_CLASS_NAMES.body}`
    const CELL_SELECTOR = `Grid.${TESTING_CLASS_NAMES.cell}`
    const HEADER_SELECTOR = `Grid.${TESTING_CLASS_NAMES.header}`
    const ROW_SELECTOR = `Grid.${TESTING_CLASS_NAMES.row}`
    const weekdayFormatter = Intl.DateTimeFormat('en-GB', {weekday: 'narrow'}).format
    const monthTitleFormatter = Intl.DateTimeFormat(
        'en-GB',
        {month: 'long', year: 'numeric'}
    ).format
    let KNOWN_DATE: Date
    const DAYS_IN_WEEK = 7

    beforeEach(() => {
        KNOWN_DATE = new Date('2000-12-31T23:59:59Z')
    })

    it('should show the month name', () => {
        const component = mount(<SmallCalendar
            monthTitleFormatter={monthTitleFormatter}
            selectedDate={KNOWN_DATE}
            weekStartsOn={WeekDayStart.Monday}
        />)

        expect(component.text()).toContain('December 2000')
    })

    it('should have the correct days across the top', () => {
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Monday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(HEADER_SELECTOR)
                .text()
        )
            .toContain('MTWTFSS')
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Sunday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(HEADER_SELECTOR)
                .text()
        )
            .toContain('SMTWTFS')
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Saturday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(HEADER_SELECTOR)
                .text()
        )
            .toContain('SSMTWTF')
    })

    it('should display the day numbers in six rows', () => {
        const expectedNumberOfRows = 6
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Monday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(BODY_SELECTOR)
                .children()
                .find(ROW_SELECTOR)
        )
            .toHaveLength(expectedNumberOfRows)
    })

    it('should start on the correct day', () => {
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Monday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(CELL_SELECTOR)
                .first()
                .text()
        )
            .toEqual('27')
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Sunday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(CELL_SELECTOR)
                .first()
                .text()
        )
            .toEqual('26')
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Saturday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(CELL_SELECTOR)
                .first()
                .text()
        )
            .toEqual('25')
    })

    it('should have the expected number of cells', () => {
        const daysInAWeek = 7
        const numberOfRows = 6
        expect(
            mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Sunday}
                weekdayNameFormatter={weekdayFormatter}
            />)
                .find(CELL_SELECTOR)
        )
            .toHaveLength(daysInAWeek * numberOfRows)
    })

    it('should allow focusing', () => {
        const component = mount(<SmallCalendar
            selectedDate={KNOWN_DATE}
            weekStartsOn={WeekDayStart.Sunday}
            weekdayNameFormatter={weekdayFormatter}
        />)

        expect(component.find('SmallCalendarDateLabel').filter({focused: true}))
            .toHaveLength(0)

        component.simulate('focus')

        expect(component.find('SmallCalendarDateLabel').filter({focused: true}))
            .toHaveLength(1)
    })

    describe('selection', () => {
        it('should call onDateSelected when a date is clicked', () => {
            const clickSpy = Sinon.spy()
            const component = mount(<SmallCalendar
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Monday}
                weekdayNameFormatter={weekdayFormatter}
                onDateSelected={clickSpy}
            />)

            expect(clickSpy.args).toHaveLength(0)

            component.find(`.${TESTING_CLASS_NAMES.cell}`).first().simulate('click')

            expect(clickSpy.args).toHaveLength(1)
            expect(clickSpy.args[0]).toHaveLength(1)
            expect(clickSpy.args[0][0]).toBeInstanceOf(Date)
        })
    })

    describe('keyboard navigation', () => {

        let component: ReactWrapper
        let onDateSelectedSpy: Sinon.SinonSpy
        const ROOT_CLASS = 'ROOT_CLASS'

        beforeEach(() => {
            onDateSelectedSpy = Sinon.spy()
            component = mount(<SmallCalendarUndecorated
                classes={{row: '', headerCell: '', root: ROOT_CLASS, monthTitle: ''}}
                selectedDate={KNOWN_DATE}
                weekStartsOn={WeekDayStart.Sunday}
                weekdayNameFormatter={weekdayFormatter}
                onDateSelected={onDateSelectedSpy}
            />)

            component.simulate('focus')
        })


        it('should move the focused day back one when left is pressed', (done) => {
            component.simulate('keyUp', {key: 'ArrowLeft'})

            component.update()

            process.nextTick(() => {
                const after = component.state() as ISmallCalendarState

                expect(after.focusedDate).toBeDefined()
                const afterDate = after.focusedDate || new Date()

                const expectedDate = new Date(KNOWN_DATE)
                expectedDate.setDate(expectedDate.getDate() - 1)

                expect(afterDate).toEqual(expectedDate)

                done()
            })
        })

        it('should move the focused day forward one when right is pressed', (done) => {
            component.simulate('keyUp', {key: 'ArrowRight'})

            component.update()

            process.nextTick(() => {
                const after = component.state() as ISmallCalendarState

                expect(after.focusedDate).toBeDefined()
                const afterDate = after.focusedDate || new Date()

                const expectedDate = new Date(KNOWN_DATE)
                expectedDate.setDate(expectedDate.getDate() + 1)

                expect(afterDate).toEqual(expectedDate)

                done()
            })
        })

        it('should move the focused day back by seven when up is pressed', (done) => {
            component.simulate('keyUp', {key: 'ArrowUp'})

            component.update()

            process.nextTick(() => {
                const after = component.state() as ISmallCalendarState

                expect(after.focusedDate).toBeDefined()
                const afterDate = after.focusedDate || new Date()

                const expectedDate = new Date(KNOWN_DATE)
                expectedDate.setDate(expectedDate.getDate() - DAYS_IN_WEEK)

                expect(afterDate).toEqual(expectedDate)

                done()
            })
        })

        it('should move the focused day forward by seven when down is pressed', (done) => {
            component.simulate('keyUp', {key: 'ArrowDown'})

            component.update()

            process.nextTick(() => {
                const after = component.state() as ISmallCalendarState

                expect(after.focusedDate).toBeDefined()
                const afterDate = after.focusedDate || new Date()

                const expectedDate = new Date(KNOWN_DATE)
                expectedDate.setDate(expectedDate.getDate() + DAYS_IN_WEEK)

                expect(afterDate).toEqual(expectedDate)

                done()
            })
        })

        it('should trigger onDateSelected when enter is pressed', () => {
            component.simulate('keyUp', {key: 'Enter'})

            expect(onDateSelectedSpy.args).toHaveLength(1)
        })
    })
})
