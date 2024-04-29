'use client';

import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
 
export const appTheme = createTheme({
    palette: {
        primary: {
            main: '#6670804f',
            contrastText: '#21f3ec'
        },
        secondary: {
            main: '#0365ede7',
        },
        text: {
            primary: '#6670804f',
            secondary: '#030702',
        },
        divider: '#0000004f',
        background: {
            default: '#0365ede7',
            paper: '#6670804f'

        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        },
        MuiSnackbar: {
            defaultProps: {
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                autoHideDuration: 3000
            }
        },	
    }
});