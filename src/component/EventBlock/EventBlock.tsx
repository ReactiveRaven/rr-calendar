import {createStyles, Theme, withStyles} from '@material-ui/core'
import * as React from 'react'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import TimeLabel from '../TimeLabel/TimeLabel'


export interface IEventBlockOwnProps {
    event: IConcreteEvent
    style?: React.CSSProperties
    display?: Partial<Record<EventFields, boolean | undefined>>
    className?: string
    accentClassName?: string
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
}

type ClassNames =
    | 'end'
    | 'root'

export type EventFields =
    | 'start'
    | 'end'
    | 'description'

const half = 2

const styles = (
    { spacing, typography, shadows }: Theme
)=> createStyles<ClassNames, {}>({
    end: {
        borderRadius: spacing(),
        bottom: spacing() / half,
        boxShadow: shadows[1],
        left: spacing() / half,
        padding: spacing() / half,
        position: 'absolute',
    },
    root: {
        background: 'lime',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '2px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: spacing(),
        position: 'absolute',
        ...typography.body1
    },
})

type EventBlockProps = IEventBlockOwnProps & { classes: Record<ClassNames, string> }

const cls = (...classes: Array<string | boolean>) =>
    classes
        .filter(item => typeof item === 'string')
        .join(' ')

class EventBlock extends React.Component<EventBlockProps, {}> {
    private readonly ref: React.RefObject<HTMLDivElement>

    constructor(props: EventBlockProps) {
        super(props)

        this.ref = React.createRef()
    }

    public render() {
        const {
            className = '',
            event: {
                className: eventClassName,
                end,
                start,
                description
            },
            style = {},
            classes: {end: endClass, root},
            i18nConfig = {},
        } = this.props

        return (
            <div
                ref={this.ref}
                style={style}
                className={[eventClassName, className, root].join(' ')}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
            >
                { this.display('start') &&
                    <div className={'start'}>
                        <TimeLabel date={start} formatter={i18nConfig.timeFormatter}/>
                    </div>
                }
                { this.display('description') &&
                    <div>
                        {description}
                    </div>
                }
                { this.display('end') &&
                    <div
                        className={cls(
                            'end',
                            endClass,
                            className
                        )}
                    >
                        <TimeLabel date={end} formatter={i18nConfig.timeFormatter}/>
                    </div>
                }
            </div>
        )
    }

    private handleClick = () => {
        const {delegate = {}} = this.props
        const { onSelectEvent } = delegate

        if (onSelectEvent !== undefined) {
            onSelectEvent(this.props.event, this.ref)
        }
    }

    private handleMouseEnter = () => {
        const {delegate = {}} = this.props
        const { onHoverEvent } = delegate

        if (onHoverEvent !== undefined) {
            onHoverEvent(this.props.event, this.ref)
        }
    }

    private display = (field: EventFields): boolean => {
        const { display } = this.props
        if (typeof display === 'undefined') {
            return true
        }
        const value = display[field]
        if (typeof value === 'undefined') {
            return true
        }
        return value
    }
}

export const undecorated = EventBlock

const decorated = withStyles(styles)(EventBlock)

export default decorated
