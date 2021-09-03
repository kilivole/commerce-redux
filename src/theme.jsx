import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme ( {
    root: {
        display: 'flex'
    },
    palette: {
        primary: {
            main: '#7FFFD4',
        }
    },
    button: {
    '& > *': {
      textTransform:'uppercase',
      fontSize: '20px',
      margin: '0 auto',
        },
    },
});