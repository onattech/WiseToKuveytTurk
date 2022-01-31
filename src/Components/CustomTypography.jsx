import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Typography as MuiTypography } from '@mui/material';

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
});

/**
 * @param {Object} props
 * @param {ChildrenFn} props.children
 */
export default function Typography({ children, ...props }) {
    return (
        <ThemeProvider theme={myTheme}>
            <MuiTypography {...props}>{children}</MuiTypography>
        </ThemeProvider>
    );
}
