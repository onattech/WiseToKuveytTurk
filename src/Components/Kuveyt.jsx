import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from './CustomTypography';
import Chip from '@mui/material/Chip';
import Kv from '../kuveyt-turk.png';
import useGetExRate from '../Hooks/useGetExRate';

export default function Kuveyt({ state: { usdSent, exRateAfterFees, tryReceived } }) {
    // Custom hook
    const [currentExRate, isLive] = useGetExRate();

    return (
        <Card sx={{ width: 500 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <img alt='KuveytTurk' src={Kv} style={{ width: 125 }} />

                {/* Current USD/TRY exchange rate */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>Current USD/TRY exchange rate</Typography>
                    <Typography variant='number'>
                        {isLive ? <Chip label='Live ●' variant='outlined' size='small' sx={{ background: 'white', color: 'green', mr: 1 }} /> : null}
                        {currentExRate[1]}
                    </Typography>
                </Box>

                {/* Exchange rate to break even */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>Exchange rate to break even</Typography>
                    {exRateAfterFees ? <Typography variant='number'>{(exRateAfterFees * 0.998).toFixed(4)}</Typography> : null}
                </Box>

                {/* Exchange rate difference */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>Exchange rate difference</Typography>
                    {exRateAfterFees ? (
                        <Typography variant='number' color={getExRateDiff(currentExRate[1], exRateAfterFees) > 0 ? '#2ead4b' : 'red'}>
                            {getExRateDiff(currentExRate[1], exRateAfterFees)}
                        </Typography>
                    ) : null}
                </Box>

                {/* USD at current exchange rate */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>USD at current exchange rate</Typography>
                    {!isNaN(tryReceived) ? <Typography variant='number'>{((tryReceived / currentExRate[1]) * 0.998).toFixed(2)} USD</Typography> : null}
                </Box>

                {/* Gain */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>Gain</Typography>
                    {!isNaN(tryReceived) ? (
                        <Typography variant='number' color={getGain(tryReceived, currentExRate, usdSent) > 0 ? '#2ead4b' : 'red'}>
                            {getGain(tryReceived, currentExRate, usdSent)} USD
                        </Typography>
                    ) : null}
                </Box>
            </CardContent>
        </Card>
    );

    function getExRateDiff(c, e) {
        return ((c - e * 0.998) * -1).toFixed(2);
    }

    function getGain(amountReceivedTr, currentExRate, dollarSent) {
        return ((amountReceivedTr / currentExRate[1]) * 0.998 - dollarSent).toFixed(2);
    }
}
