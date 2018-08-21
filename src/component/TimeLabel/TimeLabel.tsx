import * as React from 'react'

export interface ITimeLabelProps {
    date: Date
    formatter?: (date: Date) => string
}

const defaultFormatter = Intl.DateTimeFormat(
    navigator.language,
    {hour: '2-digit', minute: '2-digit', hour12: false}
).format

const TimeLabel: React.StatelessComponent<ITimeLabelProps> = (props) => {
    const formatter = props.formatter || defaultFormatter

    return (
        <span>{formatter(props.date)}</span>
    )
}

export default TimeLabel
