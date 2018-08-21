import {createStyles, Theme, Typography, withStyles, WithStyles} from '@material-ui/core'
import { HourglassFull } from '@material-ui/icons'
import * as React from 'react'
import {HOURS_IN_DAY} from '../../constants'
import {ClosedRange} from '../../utility/range'

interface ILargeCalendarDayColumnProps {
    date: Date
    weekdayFormatter?: (date: Date) => string
    dateFormatter?: (date: Date) => string
}

const styles = (theme: Theme) => createStyles({
    body: {
        background: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 9000,
        position: 'relative',
    },
    bodyBackground: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    bodyForegrond: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    cell: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
    },
    event: {
        background: theme.palette.secondary.main,
        boxSizing: 'border-box',
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        padding: theme.spacing.unit,
        position: 'absolute',
        textAlign: 'left',
        width: `calc(100% - (2 * ${theme.spacing.unit}px))`
    },
    eventOverlap1of1: {
        width: `calc(100% - (2 * ${theme.spacing.unit}px))`
    },
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        flexGrow: 1,
        padding: theme.spacing.unit,
        textAlign: 'left',
    },
    headerText: {
        color: theme.palette.primary.contrastText
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
})

const defaultWeekdayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultDateFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format

export type LargeCalendarDayColumnProps = ILargeCalendarDayColumnProps & WithStyles<typeof styles>

export const TESTING_CLASS_NAMES = {
    body: 'large-calendar-day-column-body',
    header: 'large-calendar-day-column-header',
    hourCell: 'large-calendar-day-column-cell'
}

const cls = (...classes: string[]) => classes.join(' ')

class LargeCalendarDayColumn extends React.Component<LargeCalendarDayColumnProps, {}> {
    public render() {
        const { classes: { body, cell, event, root, header, headerText } } = this.props

        const weekdayFormatter = this.props.weekdayFormatter || defaultWeekdayFormatter
        const dateFormatter = this.props.dateFormatter || defaultDateFormatter

        const hourCellClassName = [ TESTING_CLASS_NAMES.hourCell ].join(' ')

        return <div className={cls(root)}>
            <div className={cls(TESTING_CLASS_NAMES.header, header)}>
                <Typography variant={'title'} className={headerText}>
                    {weekdayFormatter(this.props.date)}
                </Typography>
                <Typography variant={'subheading'} className={headerText}>
                    {dateFormatter(this.props.date)}
                </Typography>
            </div>
            <div className={cls(TESTING_CLASS_NAMES.body, body)}>
                {
                    ClosedRange.fromTo(0, HOURS_IN_DAY - 1).asArray
                        .map(value => <div
                            key={`${value}`}
                            className={cls(hourCellClassName, cell)}
                        />)
                }
                <div
                    style={{
                        height: 'calc(100% / 24 * 1.5)',
                        top: 'calc(100% / 24 * 0)'
                    }}
                    className={event}
                >13:00 - 14:30 (1.5h) Hello World</div>
                <div
                    style={{
                        height: 'calc(100% / 24 * 1.5)',
                        top: 'calc(100% / 24 * 13)'
                    }}
                    className={event}
                >13:00 - 14:30 (<HourglassFull/> 1.5h) Hello World</div>
            </div>
        </div>
    }
}

export default withStyles(styles)(LargeCalendarDayColumn)