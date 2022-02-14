import React from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider, Typography, TypographyProps } from '@mui/material'

const myTheme = createTheme({
    typography: {
        number: {
            color: '#37517E',
            fontSize: 20,
            fontWeight: 700,
        },
        h1: {
            fontSize: 10,
        },
        h2: undefined,
        body2: {
            color: '#5D7079',
        },
    },
})

export default function WrappedTypography<C extends React.ElementType>(props: TypographyProps<C, { component?: C }>) {
    return (
        <ThemeProvider theme={myTheme}>
            <Typography {...props} />
        </ThemeProvider>
    )
}
