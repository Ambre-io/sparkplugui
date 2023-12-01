import {createTheme} from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

export const primaryMain = '#55C6E7';
export const primaryLight = '#FFCA19';
export const primaryDark = '#D724FF';

export const ambreCardBoxGrey = '#B7B7B7';

export const muiGrey = 'rgba(0, 0, 0, 0.23)';

export const theme = createTheme({
    palette: {
        primary: {
            main: primaryMain,
            light: primaryLight,
            dark: primaryDark
        },
    },
    typography: {
        fontFamily: [
            'TitilliumWeb',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiInput: {  // see: https://mui.com/material-ui/react-text-field/#using-the-theme-style-overrides-api
            styleOverrides: {
                root: {
                    color: primaryMain,
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: `2px solid ${primaryLight}`,
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    color: primaryMain
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    background: 'transparent',
                    color: primaryDark
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    '& .MuiMenuItem-root:hover': {
                        background: primaryLight,
                        color: primaryDark
                    },
                    '& .MuiMenuItem-root:focus': {
                        background: primaryLight,
                        color: primaryDark
                    },
                },
                paper: {
                    color: primaryLight,
                }
            }
        }
    }
});