import {createStyles, Theme} from '@material-ui/core'
import ClassNames from './ClassNames'
import TESTING_CLASS_NAMES from './TestingClassNames'

const firstChildBorderFix = `&:first-child .${TESTING_CLASS_NAMES.body}`

const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    allDay: {
        borderBottom: `5px solid ${theme.palette.primary.main}`,
        boxSizing: 'border-box',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden'
    },
    body: {
        borderBottomWidth: 0,
        borderColor: theme.palette.grey.A100,
        borderLeftWidth: 0,
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderTopWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 9000,
        position: 'relative'
    },
    cell: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
    },
    cellAlternate: {
        backgroundColor: theme.palette.grey.A100,
        borderBottomColor: theme.palette.background.paper
    },
    column: {
        boxSizing: 'border-box',
        paddingLeft: theme.spacing(),
        paddingRight: theme.spacing(),
    },
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        flexGrow: 1,
        padding: theme.spacing(),
        textAlign: 'left',
    },
    headerText: {
        color: theme.palette.primary.contrastText
    },
    root: {
        [firstChildBorderFix]: {
            borderLeftWidth: '1px'
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    shade: {
        background: 'black',
        left: 0,
        opacity: 0.5,
        position: 'absolute',
        right: 0,
        top: 0,
    }
})

export default styles
