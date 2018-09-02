import {
    Fade,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from '@material-ui/core'
import * as React from 'react'
import SmallCalendar from '../../component/SmallCalendar/SmallCalendar'
import WeekDayStart from '../../enum/WeekDayStart'
import Highlight from '../Highlight/Highlight'

interface ISmallCalendarDemoState {
    interactiveSelectedDate: Date
    selectedTab: number
}

export default class SmallCalendarDemo extends React.Component<{}, ISmallCalendarDemoState> {
    public readonly state: ISmallCalendarDemoState = {
        interactiveSelectedDate: new Date(),
        selectedTab: 0
    }

    public render() {
        const { selectedTab } = this.state

        const BASIC = 'Basic'
        const INTERACTION = 'Interaction'
        const DATA_DISPLAY = 'Data Display'
        const API = 'API'

        const tabs = [BASIC, INTERACTION, DATA_DISPLAY, API]

        return (
            <React.Fragment>
                <Typography variant={'display1'}>Small Calendar</Typography>
                <Paper style={{marginBottom: 8}}>
                    <Tabs value={selectedTab} onChange={this.handleSelectTab}>
                        { tabs
                            .map(label => <Tab key={label} label={label}/>)
                        }
                    </Tabs>
                </Paper>

                <Fade
                    in={tabs[selectedTab] === BASIC}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    exit={false}
                >
                    <div style={{display: 'flex'}}>
                        <Paper style={{flexGrow: 1, marginRight: 8}}>
                            <SmallCalendar
                                weekStartsOn={WeekDayStart.Monday}
                                selectedDate={new Date()}
                            />
                        </Paper>
                        <div style={{flexGrow: 9001}}>
                            <Highlight language={'html'}>
                                {`<SmallCalendar
    weekStartsOn={WeekDayStart.Monday}
    selectedDate={new Date()}
/>`}
                            </Highlight>
                        </div>
                    </div>
                </Fade>
                <Fade
                    in={tabs[selectedTab] === INTERACTION}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    exit={false}
                >
                    <div style={{display: 'flex'}}>
                        <Paper style={{flexGrow: 1, marginRight: 8}}>
                            <SmallCalendar
                                weekStartsOn={WeekDayStart.Monday}
                                selectedDate={this.state.interactiveSelectedDate}
                                onDateSelected={this.handleSelectDate}
                            />
                        </Paper>
                        <div style={{flexGrow: 9001}}>
                            <Highlight language={'html'}>
                                {`<SmallCalendar
    weekStartsOn={WeekDayStart.Monday}
    selectedDate={this.state.interactiveSelectedDate}
    onDateSelected={this.handleSelectedDate}
/>`}
                            </Highlight>
                            <Highlight language={'js'}>
                                {`handleSelectedDate = (date) => {
    this.setState({ interactiveSelectedDate: date })
}`}
                            </Highlight>
                            <Paper style={{padding: 8}}>
                                Selected date: {this.state.interactiveSelectedDate.toISOString()}
                            </Paper>
                        </div>
                    </div>
                </Fade>
                <Fade
                    in={tabs[selectedTab] === DATA_DISPLAY}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    exit={false}
                >
                    <div style={{display: 'flex'}}>
                        <Paper style={{flexGrow: 1, marginRight: 8}}>
                            <SmallCalendar
                                weekStartsOn={WeekDayStart.Monday}
                                selectedDate={new Date()}
                                events={[
                                    {
                                        // tslint:disable:no-magic-numbers
                                        end: bumpDate(makeHours(new Date(), 17), 1),
                                        start: bumpDate(makeHours(new Date(), 12), 1)
                                        // tslint:enable:no-magic-numbers
                                    }
                                ]}
                            />
                        </Paper>
                        <div style={{flexGrow: 9001}}>
                            <Highlight language={'html'}>
                                {`<SmallCalendar
    weekStartsOn={WeekDayStart.Monday}
    selectedDate={new Date()}
    events={[{start: tomorrowNoon, end: tomorrowEvening}]}
/>`}
                            </Highlight>
                        </div>
                    </div>
                </Fade>

                <Fade
                    in={tabs[selectedTab] === API}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    exit={false}
                >
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prop</TableCell>
                                    <TableCell>Required</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Default</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>selectedDate</TableCell>
                                    <TableCell>Yes</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>(today's date)</TableCell>
                                    <TableCell>The date to highlight as selected</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>weekStartsOn</TableCell>
                                    <TableCell>Yes</TableCell>
                                    <TableCell>WeekStartsOn</TableCell>
                                    <TableCell>.Monday</TableCell>
                                    <TableCell>
                                        The day displayed at the start of the week.
                                        Options on the enum are Saturday, Sunday, or Monday.
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>events</TableCell>
                                    <TableCell />
                                    <TableCell>ISimpleEvent[]</TableCell>
                                    <TableCell />
                                    <TableCell>
                                        Allows highlighting days which are of interest to the user
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>monthTitleFormatter</TableCell>
                                    <TableCell />
                                    <TableCell>(date: Date) => string</TableCell>
                                    <TableCell>(user browser's default)</TableCell>
                                    <TableCell>
                                        Allows overriding the month name and year displayed
                                        above the calendar
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>onDaySelected</TableCell>
                                    <TableCell />
                                    <TableCell>(date: Date) => void</TableCell>
                                    <TableCell />
                                    <TableCell>
                                        Allows reacting to selecting a date from the calendar
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>weekdayNameFormatter</TableCell>
                                    <TableCell />
                                    <TableCell>(date: Date) => string</TableCell>
                                    <TableCell>(user browser's default)</TableCell>
                                    <TableCell>
                                        Allows overriding the week day names,
                                        i.e. the letters above the calendar dates
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Fade>
            </React.Fragment>
        )
    }

    private handleSelectTab = (event: React.SyntheticEvent, value: number) => {
        this.setState({
            selectedTab: value
        })
    }

    private handleSelectDate = (date: Date) => {
        this.setState({
            interactiveSelectedDate: date
        })
    }
}

const makeHours = (date: Date, hour: number): Date => {
    const newDate = new Date(date)
    newDate.setHours(hour, 0, 0, 0)
    return newDate
}

const bumpDate = (date: Date, days: number): Date => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
}