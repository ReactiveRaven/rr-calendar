import * as React from 'react'

export interface IDateLabelProps {
    date: Date
    selected: boolean
    formatter?: (date: Date) => string
}

const defaultFormatter = Intl.DateTimeFormat(
    navigator.language,
    {day: 'numeric'}
).format

const DateLabel: React.StatelessComponent<IDateLabelProps> = props => {
    const formatter = props.formatter || defaultFormatter

    return (
        <span>
            {formatter(props.date)}
        </span>
    )
}

export default DateLabel
