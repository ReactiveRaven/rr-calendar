import {colors, createStyles, Theme, withStyles} from '@material-ui/core'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import WeekDayStart from '../../enum/WeekDayStart'
import IConcreteEvent from '../../model/IConcreteEvent'
import LargeCalendar from '../LargeCalendar/LargeCalendar'
import {generateDay} from '../LargeCalendarDayColumn/testData'
import SmallCalendar from '../SmallCalendar/SmallCalendar'

interface IAppState {
    selectedDate: Date
}

type ClassNames =
    | 'theme1'
    | 'theme1A'
    | 'theme2'
    | 'theme2A'
    | 'theme3'
    | 'theme3A'
    | 'theme4'
    | 'theme4A'
    | 'theme5'
    | 'theme5A'
    | 'theme6'
    | 'theme6A'

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    theme1: {
        backgroundColor: colors.cyan.A700,
        color: theme.palette.getContrastText(colors.cyan.A700)
    },
    theme1A: {
        backgroundColor: colors.cyan.A200,
        color: theme.palette.getContrastText(colors.cyan.A200)
    },
    theme2: {
        backgroundColor: colors.red.A700,
        color: theme.palette.getContrastText(colors.red.A700)
    },
    theme2A: {
        backgroundColor: colors.red.A200,
        color: theme.palette.getContrastText(colors.red.A200)
    },
    theme3: {
        backgroundColor: colors.purple.A700,
        color: theme.palette.getContrastText(colors.purple.A700)
    },
    theme3A: {
        backgroundColor: colors.purple.A200,
        color: theme.palette.getContrastText(colors.purple.A200)
    },
    theme4: {
        backgroundColor: colors.lightGreen.A700,
        color: theme.palette.getContrastText(colors.lightGreen.A700)
    },
    theme4A: {
        backgroundColor: colors.lightGreen.A200,
        color: theme.palette.getContrastText(colors.lightGreen.A200)
    },
    theme5: {
        backgroundColor: colors.grey.A700,
        color: theme.palette.getContrastText(colors.grey.A700)
    },
    theme5A: {
        backgroundColor: colors.grey.A200,
        color: theme.palette.getContrastText(colors.grey.A200)
    },
    theme6: {
        backgroundColor: colors.yellow.A400,
        color: theme.palette.getContrastText(colors.yellow.A400)
    },
    theme6A: {
        backgroundColor: colors.yellow.A100,
        color: theme.palette.getContrastText(colors.yellow.A100)
    },
})

type AppProps = {/* no own-props */} & { classes: Record<ClassNames, string> }

class App extends React.Component<AppProps, IAppState> {
    public readonly state = {
        selectedDate: new Date()
    }

    public render() {
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
        } = this.props.classes

        const eventThemes = [
            [theme1, theme1A],
            [theme2, theme2A],
            [theme3, theme3A],
            [theme4, theme4A],
            [theme5, theme5A],
            [theme6, theme6A],
        ]

        return (
            <div className='App'>
                <div className={'calendar-container'}>
                    <SmallCalendar
                        weekStartsOn={WeekDayStart.Monday}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={this.handleSelectDate}
                    />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{height: '100vh', flexGrow: 1}}>
                        <LargeCalendar
                            date={this.state.selectedDate}
                            events={generateDay(new Date(), eventThemes)}
                            delegate={{
                                onHoverEvent: this.handleHoverEvent,
                                onSelectEvent: this.handleSelectEvent
                            }}
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

    private handleHoverEvent = (event: IConcreteEvent) => {
        // tslint:disable-next-line:no-console
        console.info(JSON.stringify(event))
    }
}

export default withStyles(styles)(App)
