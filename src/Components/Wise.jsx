import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from './CustomTypography';
import wise from '../wise.svg';

import { useEffect, useState } from 'react';

export default function Wise({ state: { usdSent, exRateAfterFees, tryReceived }, setState }) {
    const [fee, setFee] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');

    const [feesInPercentage, setFeesInPercentage] = useState();

    // Set fees in percentage
    useEffect(() => {
        if (usdSent && fee) {
            setFeesInPercentage(((fee / usdSent) * 100).toFixed(2));
        }
    }, [usdSent, fee]);

    // Set exchange rate after fees applied and TRY to be recieved
    useEffect(() => {
        if (usdSent && fee && exchangeRate) {
            setState({ exRateAfterFees: exchangeRateAfterFeeCut(exchangeRate, fee, usdSent) });
            setState({ tryReceived: tryReceivedFn(exchangeRate, fee, usdSent) });
        }
    }, [usdSent, fee, exchangeRate]);

    return (
        <Card sx={{ width: 500 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <img alt='Wise' src={wise} style={{ width: 100 }} />
                <Box display='flex' gap={2}>
                    <TextField
                        onChange={(e) => {
                            setState({ usdSent: e.target.value });
                        }}
                        size='small'
                        label='Amount being sent'
                        variant='outlined'
                        sx={{ width: 170 }}
                        InputProps={{
                            startAdornment: true && <InputAdornment position='start'>$</InputAdornment>,
                        }}
                    />
                    <TextField
                        onChange={(e) => {
                            setFee(e.target.value);
                        }}
                        size='small'
                        label='Fees'
                        value={fee}
                        variant='outlined'
                        sx={{ width: 100 }}
                        InputProps={{
                            startAdornment: true && <InputAdornment position='start'>$</InputAdornment>,
                        }}
                    />
                    <TextField
                        onChange={(e) => {
                            setExchangeRate(e.target.value);
                        }}
                        size='small'
                        label='Exchange rate'
                        variant='outlined'
                        sx={{ width: 130 }}
                    />
                </Box>

                {/* Fees in percentage */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant='body2'>Fees in percentage</Typography>
                    {usdSent && fee ? ( //
                        <Typography variant='number'>% {feesInPercentage}</Typography>
                    ) : null}
                </Box>

                {/* Exchange rate after fees applied */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant='body2'>Exchange rate after fees applied</Typography>
                    {exchangeRate && fee && usdSent ? ( //
                        <Typography variant='number'>{exRateAfterFees}</Typography>
                    ) : null}
                </Box>

                {/* Amount to be received */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant='body2'>Amount to be received </Typography>
                    {exchangeRate && fee && usdSent ? ( //
                        <Typography variant='number'>{tryReceived} TRY</Typography>
                    ) : null}
                </Box>
            </CardContent>
        </Card>
    );
}

// --------- Utility functions
function exchangeRateAfterFeeCut(exchange, percentage, amount) {
    return (exchange * ((100 - parseFloat((percentage / amount) * 100)) / 100)).toFixed(4);
}

function tryReceivedFn(exchange, percentage, amount) {
    return (exchange * ((100 - parseFloat((percentage / amount) * 100)) / 100) * amount).toFixed(2);
}
