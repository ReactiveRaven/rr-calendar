import {
    createStyles,
    Grid,
    Overwrite,
    Theme,
    withStyles
} from '@material-ui/core'
import { CSSProperties, StyledComponentProps } from '@material-ui/core/styles/withStyles'
import * as React from 'react'

import WeekDayStart from '../../enum/WeekDayStart'
import SmallCalendarDateLabel from '../SmallCalendarDayLabel/SmallCalendarDateLabel'

export interface ISmallCalendarProps {
    selectedDate: Date
    weekStartsOn: WeekDayStart
    weekdayNameFormatter?: (date: Date) => string
    monthTitleFormatter?: (date: Date) => string
    onDateSelected?: (date: Date) => void
}

export interface ISmallCalendarState {
    hasFocus: boolean,
    focusedDate: Date | undefined,
    weekStartsOn: WeekDayStart
}

type ClassNames =
    | 'headerCell'
    | 'monthTitle'
    | 'root'
    | 'row'

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    headerCell: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    monthTitle: {
        ...theme.typography.title,
        color: theme.palette.text.secondary,
        margin: theme.spacing.unit,
        textAlign: 'left',
    },
    root: {
        ...theme.typography.body1,
        minWidth: `calc((2em * ${DAYS_IN_WEEK}) + (${theme.spacing.unit}px * ${DAYS_IN_WEEK - 1}))`,
        outline: 'none',
        textAlign: 'center',
    },
    row: {
        marginTop: theme.spacing.unit,
    },
})

export const TESTING_CLASS_NAMES = {
    body: 'small-calendar-body',
    cell: 'small-calendar-cell',
    header: 'small-calendar-header',
    row: 'small-calendar-row',
}

export type SmallCalendarProps = ISmallCalendarProps & { classes: Record<ClassNames, string> }

const DAYS_IN_WEEK = 7
const FULL_WIDTH_OF_GRID = 12

class SmallCalendar extends React.Component<SmallCalendarProps, ISmallCalendarState> {
    public readonly state: ISmallCalendarState = {
        focusedDate: undefined,
        hasFocus: false,
        weekStartsOn: WeekDayStart.Monday,
    }

    public componentWillReceiveProps(nextProps: SmallCalendarProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
            this.setState({
                focusedDate: undefined
            })
        }
    }

    public render() {
        const numberOfRows = 6
        const standardSpacing = 8

        const { selectedDate } = this.props
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
        const firstDisplayedDay = new Date(firstDayOfMonth.getTime())
        const targetWeekdayIndex = (DAYS_IN_WEEK + this.props.weekStartsOn.valueOf()) % DAYS_IN_WEEK
        while (firstDisplayedDay.getDay() !== targetWeekdayIndex) {
            firstDisplayedDay.setDate(firstDisplayedDay.getDate() - 1)
        }

        const rowContents = (new Array(numberOfRows))
            .fill((new Array(DAYS_IN_WEEK)).fill(undefined))
            .map((rowArray: undefined[], rowIndex: number) => {
                return <Grid
                    key={`${rowIndex}`}
                    container={true}
                    className={[TESTING_CLASS_NAMES.row, this.props.classes.row].join(' ')}
                >
                    { rowArray
                        .map((_,  columnIndex) => {
                            const currentDay = new Date(firstDisplayedDay)
                            currentDay.setDate(
                                currentDay.getDate() + (rowIndex * DAYS_IN_WEEK) + columnIndex
                            )

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

                            const modulo = 3
                            const empty = (currentDay.getDate() % modulo) === 0

                            const classes = [TESTING_CLASS_NAMES.cell]

                            return <Grid
                                key={`${columnIndex}`}
                                item={true}
                                xs={true}
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
                            </Grid>
                        })
                    }
                </Grid>
            })

        return (
            <div
                tabIndex={0}
                className={this.props.classes.root}
                onFocus={this.handleFocusEvent}
                onBlur={this.handleBlurEvent}
                onKeyUp={this.handleKeyPressEvent}
            >
                <Grid
                    container={true}
                    spacing={standardSpacing}
                    className={[TESTING_CLASS_NAMES.header].join(' ')}
                >
                    <Grid
                        item={true}
                        xs={FULL_WIDTH_OF_GRID}
                        className={this.props.classes.monthTitle}
                    >
                        {monthTitleFormatter(focusedDate)}
                    </Grid>
                    {headerItems}
                </Grid>
                <Grid
                    container={true}
                    spacing={standardSpacing}
                    className={[TESTING_CLASS_NAMES.body].join(' ')}
                >
                    {rowContents}
                </Grid>
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

const decorated: React.ComponentType<
    Overwrite<
        ISmallCalendarProps,
        StyledComponentProps<ClassNames>
    >
> = withStyles(styles)(SmallCalendar)

export default decorated
