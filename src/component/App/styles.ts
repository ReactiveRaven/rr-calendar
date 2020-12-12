import {colors, createStyles, Theme} from '@material-ui/core'
import ClassNames from './ClassNames'

const styles = (theme: Theme) => createStyles<ClassNames, {}>({
    theme1: {
        backgroundColor: colors.cyan.A700,
        color: theme.palette.getContrastText(colors.cyan.A700)
    },
    theme1A: {
        backgroundColor: colors.cyan.A200,
        color: theme.palette.getContrastText(colors.cyan.A200)
    },
    theme2: {
        backgroundColor: colors.red.A700,
        color: theme.palette.getContrastText(colors.red.A700)
    },
    theme2A: {
        backgroundColor: colors.red.A200,
        color: theme.palette.getContrastText(colors.red.A200)
    },
    theme3: {
        backgroundColor: colors.purple.A700,
        color: theme.palette.getContrastText(colors.purple.A700)
    },
    theme3A: {
        backgroundColor: colors.purple.A200,
        color: theme.palette.getContrastText(colors.purple.A200)
    },
    theme4: {
        backgroundColor: colors.lightGreen.A700,
        color: theme.palette.getContrastText(colors.lightGreen.A700)
    },
    theme4A: {
        backgroundColor: colors.lightGreen.A200,
        color: theme.palette.getContrastText(colors.lightGreen.A200)
    },
    theme5: {
        backgroundColor: colors.grey.A700,
        color: theme.palette.getContrastText(colors.grey.A700)
    },
    theme5A: {
        backgroundColor: colors.grey.A200,
        color: theme.palette.getContrastText(colors.grey.A200)
    },
    theme6: {
        backgroundColor: colors.yellow.A400,
        color: theme.palette.getContrastText(colors.yellow.A400)
    },
    theme6A: {
        backgroundColor: colors.yellow.A100,
        color: theme.palette.getContrastText(colors.yellow.A100)
    },
})

export default styles
