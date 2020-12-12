import {createStyles, Theme} from '@material-ui/core'
import ClassNames from './ClassNames'

const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    column: {
        flexGrow: 1,
        height: '100%'
    },
    root: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
})

export default styles
