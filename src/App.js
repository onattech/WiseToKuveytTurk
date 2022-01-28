import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Kv from './kuveyt-turk.png';
import { styled, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

function App() {
    return (
        <Grid container spacing={2} direction='column' alignContent='center'>
            <ThemeProvider theme={myTheme}>
                <Grid item mt={4}>
                    <Typography variant='h4' component='h1'>
                        Conversion calculation
                    </Typography>
                    <Typography variant='body1'>Provide transfer information to calculate the exchange rate to break even.</Typography>
                </Grid>
                <Grid item>
                    <Card sx={{ width: 500 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <img alt='Wise' src='https://wise.com/public-resources/assets/logos/wise/brand_logo.svg' style={{ width: 100 }} />
                            <Box display='flex' gap={2}>
                                <TextField
                                    size='small'
                                    label='Amount being sent'
                                    variant='outlined'
                                    sx={{ width: 170 }}
                                    InputProps={{
                                        startAdornment: true && <InputAdornment position='start'>$</InputAdornment>,
                                    }}
                                />
                                <TextField size='small' label='Fees' variant='outlined' sx={{ width: 100 }} />
                                <TextField size='small' label='Exchange rate' variant='outlined' sx={{ width: 130 }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Fees in percentage</Typography>
                                <Typography variant='number'>%2.71</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Exchange rate after fees applied</Typography>
                                <Typography variant='number'>13.2370</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Amount will be converted</Typography>
                                <Typography variant='number'>34.11 USD</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Amount to be received: </Typography>
                                <Typography variant='number'>464.09 TRY</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{ width: 500 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <img alt='KuveytTurk' src={Kv} style={{ width: 125 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Current USD/TRY exchange rate</Typography>
                                <Typography variant='number'>13.6966</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Exchange rate to break even</Typography>
                                <Typography variant='number'>13.2105</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Exchange rate difference</Typography>
                                <Typography variant='number'>0.10</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>USD at current exchange rate</Typography>
                                <Typography variant='number'>34.50 USD</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='body2'>Gain</Typography>
                                <Typography variant='number'>1 USD</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </ThemeProvider>
        </Grid>
    );
}

export default App;

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
