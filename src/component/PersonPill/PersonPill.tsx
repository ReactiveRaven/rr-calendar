import { Chip, Tooltip } from '@material-ui/core'
import * as React from 'react'
import IPerson from '../../model/IPerson'

interface IPersonPillOwnProps {
    className?: string
    person: IPerson
    onClick?: () => void
}

const maxNameLengthBeforeInitialising = 2
class PersonPill extends React.Component<IPersonPillOwnProps, {}> {
    public render() {
        const name = this.props.person.name

        let displayName: string
        if (name.length === 0) {
            displayName = '?'
        } else if (name.length <= maxNameLengthBeforeInitialising) {
            displayName = name
        } else {
            const initials = name.split(' ').map(word => word[0])
            if (initials.length === 1) {
                displayName = initials[0]
            } else {
                displayName = `${initials[0]}${initials[initials.length - 1]}`
            }
        }

        return <Tooltip title={name} placement={'top'}>
            <Chip
                className={this.props.className}
                label={displayName}
                onClick={this.props.onClick}
            />
        </Tooltip>
    }
}

export const undecorated = PersonPill

export default PersonPill
