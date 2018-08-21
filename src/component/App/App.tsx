import * as React from 'react'
import SmallCalendar, { WeekDayStart } from '../SmallCalendar/SmallCalendar'
import './App.css'

import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'

interface IAppState {
    selectedDate: Date
}

class App extends React.Component<{}, IAppState> {
    public readonly state = {
        selectedDate: new Date()
    }

    public render() {
        return (
            <div className='App'>
                <div className={'calendar-container'}>
                    <SmallCalendar
                        weekStartsOn={WeekDayStart.Monday}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={this.handleSelectDate}
                    />
                </div>
                <div style={{height: '100vh'}}>
                    <LargeCalendarDayColumn date={new Date()}/>
                </div>
            </div>
        )
    }

    private handleSelectDate = (selectedDate: Date) => {
        this.setState({ selectedDate })
    }
}

export default App