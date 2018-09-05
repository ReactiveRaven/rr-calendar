import {createStyles, Theme, withStyles} from '@material-ui/core'
import * as React from 'react'
import {CSSProperties} from '../../../node_modules/@material-ui/core/styles/withStyles'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import PersonPill from '../PersonPill/PersonPill'
import TimeLabel from '../TimeLabel/TimeLabel'

import FlareIcon from '@material-ui/icons/Brightness1'

export interface IEventBlockOwnProps {
    event: IConcreteEvent
    style?: React.CSSProperties
    display?: Partial<Record<EventFields, boolean | undefined>>
    emphasise?: Partial<Record<EventFields, boolean | undefined>>
    className?: string
    accentClassName?: string
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
}

type ClassNames =
    | 'end'
    | 'important'
    | 'personPill'
    | 'root'

export type EventFields =
    | 'start'
    | 'end'
    | 'people'
    | 'location'
    | 'attributes'

const quarter = 4
const half = 2

const styles = (
    { spacing, typography, shadows }: Theme
): Record<ClassNames, CSSProperties> => createStyles({
    end: {
        borderRadius: spacing.unit,
        bottom: spacing.unit / half,
        boxShadow: shadows[1],
        left: spacing.unit / half,
        padding: spacing.unit / half,
        position: 'absolute',
    },
    important: {
        ...typography.title,
        color: undefined,
        marginBottom: spacing.unit,
        marginTop: spacing.unit,
    },
    personPill: {
        marginBottom: spacing.unit / quarter,
        marginRight: spacing.unit / half,
        marginTop: spacing.unit / quarter
    },
    root: {
        background: 'lime',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '2px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: spacing.unit,
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
            accentClassName = '',
            className = '',
            event: {
                className: eventClassName,
                end,
                location: {name: locationName = '-'} = {},
                people,
                start,
                attributes
            },
            style = {},
            classes: {end: endClass, root, important, personPill},
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
                    <div
                        className={cls(
                            'start',
                            this.emphasise('start') && important
                        )}
                    >
                        <TimeLabel date={start} formatter={i18nConfig.timeFormatter}/>
                    </div>
                }
                <FlareIcon />
                { this.display('location') &&
                    <div
                        className={cls(
                            'location',
                            this.emphasise('location') && important
                        )}
                    >
                        {locationName}
                    </div>
                }
                { this.display('attributes') && Object.keys(attributes)
                    .map((key, index) => (
                        <div
                            key={`${index}`}
                            className={cls(
                                'attributes',
                                this.emphasise('attributes') && important
                            )}
                        >
                            {key}: {attributes[key]}
                        </div>
                    ))
                }
                { this.display('people') &&
                    <div
                        className={cls(
                            'people',
                            this.emphasise('people') && important
                        )}
                    >
                        {people
                            .map((value, index) => (
                                <PersonPill
                                    className={cls(personPill, accentClassName)}
                                    person={value}
                                    key={`${index}`}
                                />
                            ))
                        }
                    </div>
                }
                { this.display('end') &&
                    <div
                        className={cls(
                            'end',
                            endClass,
                            className,
                            this.emphasise('end') && important
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

    private emphasise = (field: EventFields): boolean => {
        const { emphasise } = this.props
        if (typeof emphasise === 'undefined') {
            return false
        }
        const value = emphasise[field]
        if (typeof value === 'undefined') {
            return false
        }
        return value
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
