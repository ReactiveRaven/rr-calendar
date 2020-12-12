import {
    createStyles,
    Grid,
    Theme,
    withStyles
} from '@material-ui/core'
import * as React from 'react'

import {DAYS_IN_WEEK} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import ISimpleEvent from '../../model/ISimpleEvent'
import Range from '../../utility/range/Range'
import SmallCalendarDateLabel from '../SmallCalendarDayLabel/SmallCalendarDateLabel'

export interface ISmallCalendarProps {
    selectedDate: Date
    weekStartsOn: WeekDayStart
    weekdayNameFormatter?: (date: Date) => string
    monthTitleFormatter?: (date: Date) => string
    onDateSelected?: (date: Date) => void
    events?: ISimpleEvent[]
}

export interface ISmallCalendarState {
    hasFocus: boolean,
    focusedDate: Date | undefined,
    weekStartsOn: WeekDayStart
}

type ClassNames =
    | 'cell'
    | 'headerCell'
    | 'monthTitle'
    | 'root'
    | 'row'

const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    cell: {
        flexGrow: 1,
    },
    headerCell: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(),
        marginTop: theme.spacing(),
    },
    monthTitle: {
        ...theme.typography.h5,
        color: theme.palette.text.secondary,
        margin: theme.spacing(),
        textAlign: 'left',
    },
    root: {
        ...theme.typography.body1,
        minWidth: `calc((2em * ${DAYS_IN_WEEK}) + (${theme.spacing()}px * ${DAYS_IN_WEEK - 1}))`,
        outline: 'none',
        textAlign: 'center',
    },
    row: {
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(),
        width: '100%',
    }
})

export const TESTING_CLASS_NAMES = {
    body: 'small-calendar-body',
    cell: 'small-calendar-cell',
    header: 'small-calendar-header',
    row: 'small-calendar-row',
}

export type SmallCalendarProps = ISmallCalendarProps & { classes: Record<ClassNames, string> }

class SmallCalendar extends React.PureComponent<SmallCalendarProps, ISmallCalendarState> {
    public readonly state: ISmallCalendarState = {
        focusedDate: undefined,
        hasFocus: false,
        weekStartsOn: WeekDayStart.Monday,
    }

    public componentDidUpdate(
        prevProps: Readonly<SmallCalendarProps>,
        prevState: Readonly<ISmallCalendarState>
    ): void {
        if (this.props.selectedDate !== prevProps.selectedDate) {
            this.setState({
                focusedDate: undefined
            })
        }
    }

    public render() {
        const numberOfRows = 6

        const { selectedDate, events = [] } = this.props
        const { focusedDate: maybeFocusedDate } = this.state
        const focusedDate = maybeFocusedDate || selectedDate

        const arbitraryStartOfWeekDate = new Date()
        arbitraryStartOfWeekDate
            .setDate(
                arbitraryStartOfWeekDate.getDate() -
                arbitraryStartOfWeekDate.getDay() +
                this.props.weekStartsOn.valueOf()
            )

        const monthTitleFormatter =
            this.props.monthTitleFormatter ||
                Intl.DateTimeFormat(navigator.language, { month: 'long', year: 'numeric' }).format

        const headerFormatter =
            this.props.weekdayNameFormatter ||
                Intl.DateTimeFormat(navigator.language, { weekday: 'narrow' }).format
        const headerItems = (new Array(DAYS_IN_WEEK))
            .fill(undefined)
            .map((_, index) => {
                const currentDay = new Date(arbitraryStartOfWeekDate.getTime())
                currentDay.setDate(currentDay.getDate() + index)

                return <Grid
                    key={`${index}`}
                    item={true}
                    xs={true}
                    className={this.props.classes.headerCell}
                >
                    {headerFormatter(currentDay)}
                </Grid>
            })

        const dayNumberFormatter = Intl.DateTimeFormat(navigator.language, {day: 'numeric'})
            .format
        const firstDayOfMonth = new Date(focusedDate)
        firstDayOfMonth.setDate(1)
        const firstDisplayedDay = new Date(firstDayOfMonth)
        const targetWeekdayIndex = (DAYS_IN_WEEK + this.props.weekStartsOn.valueOf()) % DAYS_IN_WEEK
        while (firstDisplayedDay.getDay() !== targetWeekdayIndex) {
            firstDisplayedDay.setDate(firstDisplayedDay.getDate() - 1)
        }

        const eventRanges = events.map(event => Range.fromToLessThan(event.start, event.end))

        const rowContents = (new Array(numberOfRows))
            .fill((new Array(DAYS_IN_WEEK)).fill(undefined))
            .map((rowArray: undefined[], rowIndex: number) => {
                return <div
                    key={`${rowIndex}`}
                    className={[TESTING_CLASS_NAMES.row, this.props.classes.row].join(' ')}
                >
                    { rowArray
                        .map((_,  columnIndex) => {
                            const currentDay = new Date(firstDisplayedDay)
                            currentDay.setDate(
                                currentDay.getDate() + (rowIndex * DAYS_IN_WEEK) + columnIndex
                            )

                            const todayForRange = new Date()
                            todayForRange.setFullYear(
                                currentDay.getFullYear(),
                                currentDay.getMonth(),
                                currentDay.getDate()
                            )
                            todayForRange.setHours(0, 0, 0, 0)
                            const tomorrowForRange = new Date(todayForRange)
                            tomorrowForRange.setDate(todayForRange.getDate() + 1)

                            const dateRange = Range.fromToLessThan(todayForRange, tomorrowForRange)

                            const isFocusedMonth = (
                                focusedDate.getMonth() === currentDay.getMonth() &&
                                    focusedDate.getFullYear() === currentDay.getFullYear()
                            )

                            const isSelectedDate = (
                                selectedDate.getDate() === currentDay.getDate() &&
                                    selectedDate.getMonth() === currentDay.getMonth() &&
                                    selectedDate.getFullYear() === currentDay.getFullYear()
                            )

                            const isFocusedDate = (
                                    isFocusedMonth &&
                                    focusedDate.getDate() === currentDay.getDate()
                            )

                            const eventsForDay = eventRanges
                                .filter(range => dateRange.overlapsRange(range))
                            const empty = eventsForDay.length === 0

                            const classes = [TESTING_CLASS_NAMES.cell, this.props.classes.cell]

                            return <div
                                key={`${columnIndex}`}
                                className={classes.join(' ')}
                                onClick={this.handleClickEvent(currentDay)}
                            >
                                <SmallCalendarDateLabel
                                    current={isFocusedMonth}
                                    focused={this.state.hasFocus && isFocusedDate}
                                    active={isSelectedDate}
                                    empty={empty}
                                >
                                    {dayNumberFormatter(currentDay)}
                                </SmallCalendarDateLabel>
                            </div>
                        })
                    }
                </div>
            })

        return (
            <div
                tabIndex={0}
                className={this.props.classes.root}
                onFocus={this.handleFocusEvent}
                onBlur={this.handleBlurEvent}
                onKeyDown={this.handleKeyPressEvent}
            >
                <div
                    className={TESTING_CLASS_NAMES.header}
                >
                    <div className={this.props.classes.row}>
                        <div
                            className={[
                                this.props.classes.monthTitle
                            ].join(' ')}
                        >
                            {monthTitleFormatter(focusedDate)}
                        </div>
                    </div>
                    <div className={this.props.classes.row}>
                        {headerItems}
                    </div>
                </div>
                <div
                    className={[TESTING_CLASS_NAMES.body].join(' ')}
                >
                    {rowContents}
                </div>
            </div>
        )
    }

    private handleFocusEvent = () => {
        this.setState({
            hasFocus: true
        })
    }

    private handleBlurEvent = () => {
        this.setState({
            hasFocus: false
        })
    }

    private handleKeyPressEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
        let shouldPreventDefault = true
        switch (event.key) {
            case 'ArrowDown':
                this.setState((prevState, props) => {
                    const focusedDate = new Date(
                        (prevState.focusedDate || props.selectedDate).getTime()
                    )
                    focusedDate.setDate(focusedDate.getDate() + DAYS_IN_WEEK)
                    return { focusedDate }
                })
                break
            case 'ArrowLeft':
                this.setState((prevState, props) => {
                    const focusedDate = new Date(
                        (prevState.focusedDate || props.selectedDate).getTime()
                    )
                    focusedDate.setDate(focusedDate.getDate() - 1)
                    return { focusedDate }
                })
                break
            case 'ArrowRight':
                this.setState((prevState, props) => {
                    const focusedDate = new Date(
                        (prevState.focusedDate || props.selectedDate).getTime()
                    )
                    focusedDate.setDate(focusedDate.getDate() + 1)
                    return { focusedDate }
                })
                break
            case 'ArrowUp':
                this.setState((prevState, props) => {
                    const focusedDate = new Date(
                        (prevState.focusedDate || props.selectedDate).getTime()
                    )
                    focusedDate.setDate(focusedDate.getDate() - DAYS_IN_WEEK)
                    return { focusedDate }
                })
                break
            case 'Enter':
                this.handleClickEvent(this.state.focusedDate || this.props.selectedDate)()
                break
            default:
                shouldPreventDefault = false
        }

        if (shouldPreventDefault) {
            event.preventDefault()
        }
    }

    private handleClickEvent = (date: Date) => () => {
        if (this.props.onDateSelected !== undefined) {
            this.props.onDateSelected(date)
        }
    }
}

export const undecorated = SmallCalendar

const decorated = withStyles(styles)(SmallCalendar)

export default decorated
