import { createStyles, Theme, withStyles } from '@material-ui/core'
import * as React from 'react'

export interface ISmallCalendarDateLabelProps {
    active?: boolean
    current?: boolean
    focused?: boolean
    empty?: boolean
}

type ClassNames =
    | 'active'
    | 'activeInner'
    | 'current'
    | 'focused'
    | 'focusedInner'
    | 'nonEmpty'
    | 'notCurrent'
    | 'root'

const shadowElevation = 4
const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    active: {
        backgroundColor: theme.palette.primary.main
    },
    activeInner: {
        color: theme.palette.primary.contrastText
    },
    current: {
        color: theme.palette.text.primary,
    },
    focused: {
        // backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        borderWidth: '1px',
        boxShadow: theme.shadows[shadowElevation],
    },
    focusedInner: {
        // color: theme.palette.secondary.contrastText
    },
    nonEmpty: {
        background: theme.palette.grey.A100
    },
    notCurrent: {
        opacity: 0.5,
    },
    root: {
        borderRadius: '1em',
        boxSizing: 'border-box',
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        height: '2em',
        lineHeight: '2em',
        margin: 'auto',
        // transition: 'box-shadow 0.1s',
        width: '2em',
    }
})

export type SmallCalendarDateLabelProps =
    ISmallCalendarDateLabelProps &
    { classes: Record<ClassNames, string> }


class  SmallCalendarDateLabel extends React.PureComponent<SmallCalendarDateLabelProps, {}>
{
    public render() {
        const props = this.props

        const outerClasses = [props.classes.root]
        const innerClasses = []
        if (props.active === true) {
            outerClasses.push(props.classes.active)
            innerClasses.push(props.classes.activeInner)
        } else {
            if (props.current === true) {
                innerClasses.push(props.classes.current)
            } else {
                outerClasses.push(props.classes.notCurrent)
            }
            if (props.empty === false) {
                outerClasses.push(props.classes.nonEmpty)
            }
        }

        if (props.focused === true) {
            outerClasses.push(props.classes.focused)
            innerClasses.push(props.classes.focusedInner)
        }

        return (
            <div className={outerClasses.join(' ')}>
                <div className={innerClasses.join(' ')} >
                    {props.children}
                </div>
            </div>
        )
    }
}

export const undecorated = SmallCalendarDateLabel

const decorated = withStyles(styles)(SmallCalendarDateLabel)

export default decorated
