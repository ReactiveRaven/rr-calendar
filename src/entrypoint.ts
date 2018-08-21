import * as React from 'react'

import {
    default as _DateLabel,
    IDateLabelProps
} from './component/DateLabel/DateLabel'
import {
    default as _SmallCalendar,
    ISmallCalendarProps,
} from './component/SmallCalendar/SmallCalendar'
import {
    default as _SmallCalendarDayLabel,
    SmallCalendarDateLabelProps
} from './component/SmallCalendarDayLabel/SmallCalendarDateLabel'
import { default as _TimeLabel, ITimeLabelProps} from './component/TimeLabel/TimeLabel'
import { default as _WeekDayStart } from './enum/WeekDayStart'

export const DateLabel =
    _DateLabel as React.StatelessComponent<IDateLabelProps>
export const SmallCalendar =
    _SmallCalendar as React.StatelessComponent<ISmallCalendarProps>
export const SmallCalendarDayLabel =
    _SmallCalendarDayLabel as React.StatelessComponent<SmallCalendarDateLabelProps>
export const TimeLabel =
    _TimeLabel as React.StatelessComponent<ITimeLabelProps>
export const WeekDayStart = _WeekDayStart
