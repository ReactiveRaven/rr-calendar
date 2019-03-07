import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ClosedRange from '../../utility/range/ClosedRange'
import {EventFields} from '../EventBlock/EventBlock'
import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'

interface IDaysAroundView {
    date: Date
    events: IConcreteEvent[]
    before?: number
    after?: number
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

type ClassNames =
    | 'column'
    | 'root'

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    column: {
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1,
        height: '100%'
    },
    root: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
})

type DaysAroundViewProps = IDaysAroundView & WithStyles<typeof styles>

const alternateStripes = 2

class DaysAroundView extends React.Component<DaysAroundViewProps, {}> {
    public render() {
        const {
            after = 0,
            before = 0,
            classes,
            date,
            emphasise,
            display,
            i18nConfig,
            delegate,
            events,
            renderEvent
        } = this.props

        const { column, root } = classes

        const dates = ClosedRange.fromTo(-before, after)
            .asArray()
            .map(index => makeDate(date, index))

        return (
            <div className={root}>
                { dates
                    .map((currentDate, index) =>
                        <LargeCalendarDayColumn
                            alternate={(index % alternateStripes) === 1}
                            date={currentDate}
                            className={column}
                            display={display}
                            emphasise={emphasise}
                            events={events}
                            key={currentDate.toISOString()}
                            i18nConfig={i18nConfig}
                            delegate={delegate}
                            renderEvent={renderEvent}
                        />
                    )
                }
            </div>
        )
    }
}

const makeDate = (date: Date, dayDifference: number): Date => {
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    newDate.setDate(newDate.getDate() + dayDifference)
    return newDate
}

export default withStyles(styles)(DaysAroundView)
