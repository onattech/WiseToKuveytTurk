import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '../../MUI/CustomTypography'
import Kv from '../../Assets/kuveyt-turk.png'
import useGetExRate from '../../Hooks/useGetExRate'
import ExRateStream from './ExRateStream'
import LiveExRateDisplay from './LiveExRateDisplay'
import { ReducerProps, StreamType } from '../../Types/PropTypes'

const ching = require('../../Assets/ching.mp3')

export default function Kuveyt({ state }: { state: ReducerProps }) {
    // Custom hook
    const { currentExRate, isLive } = useGetExRate()

    // Global state
    const { usdSent, exRateAfterFees, tryReceived } = state

    // Local state
    const [stream, setStream] = useState<StreamType>([])
    const [lastUpdateStatus, setLastUpdateStatus] = useState<'increased' | 'decreased' | 'same'>('same')
    const [count, setCount] = useState(1)
    if (process.env.NODE_ENV === 'development') {
        console.log('🚀updating....')
        console.log('🚀 ~ file: Kuveyt.jsx ~ line 19 ~ Kuveyt ~ streamobj', stream)
    }

    // const audio = new Audio(ching)
    // audio.play()

    // Update exchange rates every 5 seconds
    useEffect(() => {
        if (currentExRate.sell === '') return
        setStream([...stream, { buy: currentExRate.buy, sell: currentExRate.sell, date: new Date().toISOString(), count }])
        setCount(count + 1)

        if (stream.length < 3) return
        if (currentExRate.sell > stream.splice(-2)[0].sell) {
            setLastUpdateStatus('increased')
        } else if (currentExRate.sell < stream.splice(-2)[0].sell) {
            setLastUpdateStatus('decreased')
        } else {
            setLastUpdateStatus('same')
        }
    }, [currentExRate])

    return (
        <>
            {process.env.NODE_ENV === 'development' ? <h1>Environment {process.env.NODE_ENV}</h1> : null}
            <Card sx={{ width: 500 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <img alt="KuveytTurk" src={Kv} style={{ width: 125 }} />
                    </Box>

                    {/* Exchange rate history */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography variant="body2">Exchange rate history</Typography>
                        <ExRateStream stream={stream} currentExRate={currentExRate} />
                    </Box>

                    {/* Current USD/TRY exchange rate */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Current USD/TRY exchange rate</Typography>
                        <LiveExRateDisplay isLive={isLive} currentExRate={currentExRate.sell} lastUpdateStatus={lastUpdateStatus} />
                    </Box>

                    {/* Exchange rate to break even */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Exchange rate to break even</Typography>
                        <Typography variant="number">{exRateAfterFees && (exRateAfterFees * 0.998).toFixed(4)}</Typography>
                    </Box>

                    {/* Exchange rate difference */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Exchange rate difference</Typography>
                        <Typography variant="number" color={getExRateDiff(currentExRate.sell, exRateAfterFees) > 0 ? '#2ead4b' : 'red'}>
                            {Math.abs(getExRateDiff(currentExRate.sell, exRateAfterFees)) > 0 && Math.abs(getExRateDiff(currentExRate.sell, exRateAfterFees)).toFixed(2)}
                        </Typography>
                    </Box>

                    {/* USD at current exchange rate */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">USD at current exchange rate</Typography>
                        {typeof tryReceived === 'number' ? <Typography variant="number">{((tryReceived / Number(currentExRate.sell)) * 0.998).toFixed(2)} USD</Typography> : null}
                    </Box>

                    {/* Gain */}
                    {tryReceived && usdSent ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">{getGain(tryReceived, currentExRate, usdSent) > 0 ? 'Gain' : 'Loss'}</Typography>
                            <Typography variant="number" color={getGain(tryReceived, currentExRate, usdSent) > 0 ? '#2ead4b' : 'red'}>
                                {Math.abs(getGain(tryReceived, currentExRate, usdSent)).toFixed(2)} USD
                            </Typography>
                        </Box>
                    ) : null}
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
                                <span style={{ marginRight: 10 }}>{a.buy}</span>
                                <span style={{ marginRight: 10 }}>{a.sell}</span>
                                <span style={{ marginRight: 10 }}>{new Date(a.date).toLocaleTimeString()}</span>
                                <span>{a.count}</span>
                            </div>
                        ))}
                    </Box>
                </Box>
            ) : null}
        </>
    )

    function getExRateDiff(currentRate: number | '', rateAfterFees: number | ''): number {
        console.log((Number(currentRate) - Number(rateAfterFees) * 0.998) * -1)
        if (currentRate === '' || rateAfterFees === '') {
            return 0
        }
        return (Number(currentRate) - Number(rateAfterFees) * 0.998) * -1
    }

    function getGain(amountReceivedTr: number, currentRate: { buy: number | ''; sell: number | '' }, dollarSent: number): number {
        return (amountReceivedTr / Number(currentRate.sell)) * 0.998 - dollarSent
    }
}
