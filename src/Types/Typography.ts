export {}
declare module '@mui/material/styles' {
    interface TypographyVariants {
        number: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        number?: React.CSSProperties
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        number: true
    }
}
