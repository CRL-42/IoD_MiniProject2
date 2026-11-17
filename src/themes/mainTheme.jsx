import {createTheme} from "@mui/material/styles";

export const mainTheme = createTheme({
    palette: {
        primary: {main: '#5D3FD3', contrastText: '#ea9234'},
        secondary: {main: '#022eff', contrastText: '#ffffff'}
    },
    typography: {
        fontFamily: 'ui-rounded',
        fontSize: 16,
        h1: { fontSize: 32 },
    },
    shape: { borderRadius: 5 },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                body: {background: '#222'},
                h1: { color: theme.palette.primary.contrastText }, 
                h3: { color: theme.palette.primary.contrastText },
                h4: { color: theme.palette.primary.contrastText },
                p: { color: theme.palette.primary.contrastText},
            })
        },
       
        MuiAppBar: {defaultProps: { position: 'static'}},
        
        MuiCard: {
            defaultProps: { 
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    padding: '8px', // Equivalent to sx={{ p: 1 }} (8px per theme spacing unit)
                    border: '1px solid black',
                    height: '100%',
                    backgroundColor: '#333',
                },
            }, 
        },
        
        MuiButton: {
            defaultProps: {
                variant: 'outlined'
            }
        },
        
        MuiFormLabel: {
            defaultProps: { 
                variant: 'filled' 
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.contrastText,
                }),
            },
        },

        MuiFormControlLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.secondary.main,
                }),
            },
        },

        MuiTextField: { 
            defaultProps: { 
                variant: 'outlined',
            },
            styleOverrides: {
                root: ({theme}) => ({
                    '& .MuiInputBase-input': {
                        color: theme.palette.secondary.main,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.secondary.main,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.secondary.contrastText,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.secondary.main,
                        },
                    },
                })
            }
        },
        
    },
});