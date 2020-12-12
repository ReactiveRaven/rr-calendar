import {withStyles} from '@material-ui/core'
import * as React from 'react'
import WeekDayStart from '../../enum/WeekDayStart'
import IConcreteEvent from '../../model/IConcreteEvent'
import LargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/LargeCalendarViewConfig'
import LargeCalendar from '../LargeCalendar/LargeCalendar'
import {generateDay, IExtendedEvent} from '../LargeCalendarDayColumn/testData'
import SmallCalendar from '../SmallCalendar/SmallCalendar'
import ClassNames from './ClassNames'
import styles from './styles'

interface IAppState {
    selectedDate: Date
}

type AppProps = {/* no own-props */} & { classes: Record<ClassNames, string> }

class App extends React.Component<AppProps, IAppState> {
    public readonly state = {
        selectedDate: new Date()
    }

    private readonly exampleEvents: IConcreteEvent[]

    constructor(props: AppProps) {
        super(props)

        const {
            theme1,
            theme1A,
            theme2,
            theme2A,
            theme3,
            theme3A,
            theme4,
            theme4A,
            theme5,
            theme5A,
            theme6,
            theme6A
        } = props.classes

        const eventThemes = [
            [theme1, theme1A],
            [theme2, theme2A],
            [theme3, theme3A],
            [theme4, theme4A],
            [theme5, theme5A],
            [theme6, theme6A],
        ]

        this.exampleEvents = generateDay(new Date(), eventThemes)
    }

    public render() {
        const now = { date: new Date(), timezone: 'UTC' }

        return (
            <div className='App'>
                <div className={'calendar-container'}>
                    <SmallCalendar
                        weekStartsOn={WeekDayStart.Monday}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={this.handleSelectDate}
                    />
                </div>
                <div style={{ display: 'flex', width: 'calc(100% - 16px)', margin: 'auto' }}>
                    <div style={{height: '100vh', flexGrow: 1}}>
                        <LargeCalendar
                            date={this.state.selectedDate}
                            now={now}
                            events={this.exampleEvents}
                            delegate={{
                                onHoverEvent: this.handleHoverEvent,
                                onSelectEvent: this.handleSelectEvent
                            }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', width: 'calc(100% - 16px)', margin: 'auto' }}>
                    <div style={{height: '100vh', flexGrow: 1}}>
                        <LargeCalendar
                            date={this.state.selectedDate}
                            now={now}
                            events={this.exampleEvents}
                            delegate={{
                                onHoverEvent: this.handleHoverEvent,
                                onSelectEvent: this.handleSelectEvent
                            }}
                            viewConfig={LargeCalendarViewConfig.groupedWeekView({
                                swimlaneForEvent: (event: IExtendedEvent) => event.location.name
                            })}
                        />
                    </div>
                </div>
            </div>
        )
    }

    private handleSelectDate = (selectedDate: Date) => {
        this.setState({ selectedDate })
    }

    private handleSelectEvent = (event: IConcreteEvent) => {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(event))
    }

    private handleHoverEvent = (event: IConcreteEvent, ref: React.RefObject<HTMLElement>) => {
        // tslint:disable-next-line:no-console
        console.info(JSON.stringify(event), ref)
    }
}

export default withStyles(styles)(App)
