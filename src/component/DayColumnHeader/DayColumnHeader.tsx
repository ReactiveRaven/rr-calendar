import * as React from 'react';

class DayColumnHeader extends React.Component<{}, {}> {
    render() {
        return (
            <div className={cls(TESTING_CLASS_NAMES.header, header)}>
                <Typography variant={'h5'} className={headerText}>
                    {weekDayFormatter(date)}
                </Typography>
                <Typography variant={'subtitle1'} className={headerText}>
                    {monthDayFormatter(date)}
                </Typography>
            </div>
        )
    }
}
