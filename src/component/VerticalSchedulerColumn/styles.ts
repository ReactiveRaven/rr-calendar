import {createStyles, Theme} from '@material-ui/core'
import ClassNames from './ClassNames'
import TESTING_CLASS_NAMES from './TESTING_CLASS_NAMES'

const firstChildBorderFix = `&:first-child .${TESTING_CLASS_NAMES.body}`

const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    body: {
        borderBottomWidth: '1px',
        borderColor: theme.palette.grey.A100,
        borderLeftWidth: 0,
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderTopWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 9000,
        position: 'relative',
    },
    cell: {
        '&:first-child': {
            borderLeft: 'none !important',
        },
        backgroundColor: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.grey.A100}`,
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%'
    },
    column: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
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
        flexGrow: 1,
        height: '100%'
    },
    swimlane: {
        '&:first-child': {
            borderTop: 'none'
        },
        borderTop: `1px solid ${theme.palette.grey.A100}`,
        position: 'relative',
    }
})

export default styles
