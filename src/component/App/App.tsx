import * as React from 'react'
import WeekDayStart from '../../enum/WeekDayStart'
import SmallCalendar from '../SmallCalendar/SmallCalendar'

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
            </div>
        )
    }

    private handleSelectDate = (selectedDate: Date) => {
        this.setState({ selectedDate })
    }
}

export default App
