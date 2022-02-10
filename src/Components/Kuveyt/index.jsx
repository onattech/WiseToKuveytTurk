import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '../CustomTypography';
import Kv from './kuveyt-turk.png';
import useGetExRate from '../../Hooks/useGetExRate';
import ching from './ching.mp3';
import { useEffect, useState } from 'react';
import LiveExRateDisplay from './LiveExRateDisplay';
import ExRateDeltas from './ExRateDeltas';

export default function Kuveyt({ state: { usdSent, exRateAfterFees, tryReceived } }) {
    // Custom hook
    const [currentExRate, isLive] = useGetExRate();

    // Local state
    const [stream, setStream] = useState([]);
    const [lastUpdateStatus, setLastUpdateStatus] = useState('same');
    const [count, setCount] = useState(1);
    if (process.env.NODE_ENV === 'development') {
        console.log('🚀 ~ file: Kuveyt.jsx ~ line 19 ~ Kuveyt ~ stream', stream);
    }

    let audio = new Audio(ching);
    // audio.play();

    useEffect(() => {
        if (currentExRate.length === 0) return;
        setStream([...stream, [...currentExRate, new Date().toISOString(), count]]);
        setCount(count + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (stream.length < 2) return;
        if (currentExRate[1] > stream.at(-2)[1]) {
            setLastUpdateStatus('increased');
        } else if (currentExRate[1] < stream.at(-2)[1]) {
            setLastUpdateStatus('decreased');
        } else {
            setLastUpdateStatus('same');
        }
    }, [currentExRate]);

    return (
        <>
            {process.env.NODE_ENV === 'development' ? <h1>Environment {process.env.NODE_ENV}</h1> : null}
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <img alt='KuveytTurk' src={Kv} style={{ width: 125 }} />
                    </Box>

                    {/* Exchange rate history */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '-10ppx' }}>
                        <Typography variant='body2'>Exchange rate history</Typography>
                        <ExRateDeltas stream={stream} currentExRate={currentExRate} />
                    </Box>

                    {/* Current USD/TRY exchange rate */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mr: '-10ppx' }}>
                        <Typography variant='body2'>Current USD/TRY exchange rate</Typography>
                        <LiveExRateDisplay isLive={isLive} currentExRate={currentExRate[1]} lastUpdateStatus={lastUpdateStatus} />
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

            {process.env.NODE_ENV === 'development' ? (
                <Box>
                    {/* <p>One minute ago</p> */}
                    <p>DEBUG</p>
                    {/* <div>Time difference: {(new Date(stream.at(-13)[2]) - new Date()) / 1000}</div> */}
                    {/* <div>Sale rate: {stream.at(-13)[1]}</div> */}
                    {/* <span>{stream.at(-13)[1] < stream.at(-1)[1] ? 'increased' : 'decreased'}</span> */}
                    <p></p>
                    <Box>
                        {stream.map((a) => (
                            <div>
                                <span style={{ marginRight: 10 }}>{a[0]}</span>
                                <span style={{ marginRight: 10 }}>{a[1]}</span>
                                <span style={{ marginRight: 10 }}>{new Date(a[2]).toLocaleTimeString()}</span>
                                <span>{a[3]}</span>
                            </div>
                        ))}
                    </Box>
                </Box>
            ) : null}
        </>
    );

    function getExRateDiff(c, e) {
        return ((c - e * 0.998) * -1).toFixed(2);
    }

    function getGain(amountReceivedTr, currentExRate, dollarSent) {
        return ((amountReceivedTr / currentExRate[1]) * 0.998 - dollarSent).toFixed(2);
    }
}
