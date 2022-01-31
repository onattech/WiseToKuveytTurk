import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from './CustomTypography';
import Kv from '../kuveyt-turk.png';
import { useEffect, useState } from 'react';

export default function Kuveyt({ amountRecievedTr, dollarSent, exchangeRateAfterFees }) {
    const [currentExRate, setCurrentExRate] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            // fetch('https://go-proxy-kuveyt.herokuapp.com/')
            fetch('https://www.kuveytturk.com.tr/finans-portali/')
                .then((result) => result.text())
                .then((content) => setCurrentExRate(extractUSD(content)));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card sx={{ width: 500 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <img alt='KuveytTurk' src={Kv} style={{ width: 125 }} />

                {/* Current USD/TRY exchange rate */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Current USD/TRY exchange rate</Typography>
                    <Typography variant='number'>{currentExRate[1]}</Typography>
                </Box>

                {/* Exchange rate to break even */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Exchange rate to break even</Typography>
                    {exchangeRateAfterFees ? <Typography variant='number'>{(exchangeRateAfterFees * 0.998).toFixed(4)}</Typography> : null}
                </Box>

                {/* Exchange rate difference */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Exchange rate difference</Typography>
                    {exchangeRateAfterFees ? (
                        <Typography variant='number' color={getExRateDiff(currentExRate[1], exchangeRateAfterFees) > 0 ? '#2ead4b' : 'red'}>
                            {getExRateDiff(currentExRate[1], exchangeRateAfterFees)}
                        </Typography>
                    ) : null}
                </Box>

                {/* USD at current exchange rate */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>USD at current exchange rate</Typography>
                    {!isNaN(amountRecievedTr) ? <Typography variant='number'>{((amountRecievedTr / currentExRate[1]) * 0.998).toFixed(2)} USD</Typography> : null}
                </Box>

                {/* Gain */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>Gain</Typography>
                    {!isNaN(amountRecievedTr) ? (
                        <Typography variant='number' color={getGain(amountRecievedTr, currentExRate, dollarSent) > 0 ? '#2ead4b' : 'red'}>
                            {getGain(amountRecievedTr, currentExRate, dollarSent)} USD
                        </Typography>
                    ) : null}
                </Box>
            </CardContent>
        </Card>
    );
}

function extractUSD(text) {
    const idx = text.indexOf('USD (Amerikan Doları)');
    const section = text.substring(idx, idx + 800);
    const rate = section.match(/\d\d,\d\d\d\d/g);
    const rateClean = rate.map((a) => (a.replace(',', '.') * 1).toFixed(4));

    return rateClean;
}

function getExRateDiff(c, e) {
    return ((c - e * 0.998) * -1).toFixed(2);
}

function getGain(amountRecievedTr, currentExRate, dollarSent) {
    return ((amountRecievedTr / currentExRate[1]) * 0.998 - dollarSent).toFixed(2);
}
