import Grid from '@mui/material/Grid';
import Typography from './Components/CustomTypography';
import Wise from './Components/Wise';
import Kuveyt from './Components/Kuveyt';
import { useReducer } from 'react';

function reducer(currentState, newState) {
    return { ...currentState, ...newState };
}

function App() {
    const [state, setState] = useReducer(reducer, {
        tryReceived_: null,
        usdSent: null,
        exRateAfterFees: null,
    });

    return (
        <Grid container spacing={2} direction='column' alignContent='center'>
            <Grid item mt={4}>
                <Typography variant='h4' component='h1'>
                    Conversion calculation
                </Typography>

                <Typography variant='body1'>Provide transfer information to calculate the exchange rate to break even.</Typography>
            </Grid>

            <Grid item>
                <Wise state={state} setState={setState} />
            </Grid>

            <Grid item>
                <Kuveyt state={state} />
            </Grid>
        </Grid>
    );
}

export default App;
