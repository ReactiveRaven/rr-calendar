import * as React from 'react'

import {
    default as _DateLabel,
    IDateLabelProps
} from './component/DateLabel/DateLabel'
import { default as _LargeCalendar } from './component/LargeCalendar/LargeCalendar'
import {
    default as _LargeCalendarDayColumn,
    ILargeCalendarDayColumnProps,
} from './component/LargeCalendarDayColumn/LargeCalendarDayColumn'
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
export { default as IConcreteEvent } from './model/IConcreteEvent'
import { default as _EventBlock, IEventBlockOwnProps } from './component/EventBlock/EventBlock'
export { default as EventRenderer } from './model/EventRenderer'

export const DateLabel =
    _DateLabel as React.StatelessComponent<IDateLabelProps>
export const EventBlock =
    _EventBlock as React.StatelessComponent<IEventBlockOwnProps>
export const LargeCalendar = _LargeCalendar
export const LargeCalendarDayColumn =
    _LargeCalendarDayColumn as React.StatelessComponent<ILargeCalendarDayColumnProps>
export const SmallCalendar =
    _SmallCalendar as React.StatelessComponent<ISmallCalendarProps>
export const SmallCalendarDayLabel =
    _SmallCalendarDayLabel as React.StatelessComponent<SmallCalendarDateLabelProps>
export const TimeLabel =
    _TimeLabel as React.StatelessComponent<ITimeLabelProps>
export const WeekDayStart = _WeekDayStart
