import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import {EventFields} from '../component/EventBlock/EventBlock'
import ICalendarDelegate from './ICalendarDelegate'
import ICalendarI18NConfig from './ICalendarI18NConfig'
import IConcreteEvent from './IConcreteEvent'

type EventRenderer = (
    options: {
        delegate: ICalendarDelegate
        display: Partial<Record<EventFields, boolean>>
        emphasise: Partial<Record<EventFields, boolean>>
        event: IConcreteEvent
        i18nConfig: ICalendarI18NConfig
        key: string
        style: CSSProperties
    }
    // tslint:disable-next-line:no-any
) => React.ReactElement<any>

export default EventRenderer
