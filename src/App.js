import Grid from '@mui/material/Grid';
import Typography from './Components/CustomTypography';
import Wise from './Components/Wise';
import Kuveyt from './Components/Kuveyt';
import { useState } from 'react';

function App() {
    const [amountRecievedTr, setAmountRecievedTRY] = useState();
    const [dollarSent, setDollarSent] = useState('');
    const [exchangeRateAfterFees, setExchangeRateAfterFees] = useState(null);

    return (
        <Grid container spacing={2} direction='column' alignContent='center'>
            <Grid item mt={4}>
                <Typography variant='h4' component='h1'>
                    Conversion calculation
                </Typography>

                <Typography variant='body1'>Provide transfer information to calculate the exchange rate to break even.</Typography>
            </Grid>

            <Grid item>
                <Wise
                    amountRecievedTr={amountRecievedTr}
                    setAmountRecievedTRY={setAmountRecievedTRY}
                    dollarSent={dollarSent}
                    setDollarSent={setDollarSent}
                    exchangeRateAfterFees={exchangeRateAfterFees}
                    setExchangeRateAfterFees={setExchangeRateAfterFees}
                />
            </Grid>

            <Grid item>
                <Kuveyt exchangeRateAfterFees={exchangeRateAfterFees} amountRecievedTr={amountRecievedTr} dollarSent={dollarSent} />
            </Grid>
        </Grid>
    );
}

export default App;
