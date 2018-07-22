import * as React from 'react'
import SmallCalendar, { WeekDayStart } from '../SmallCalendar/SmallCalendar'
import './App.css'

import logo from './logo.svg'

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
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'>Welcome to React</h1>
                </header>
                <p className='App-intro'>
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
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