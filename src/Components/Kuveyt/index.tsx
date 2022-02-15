import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '../../MUI/CustomTypography'
import Kv from '../../Assets/kuveyt-turk.png'
import useGetExRate from '../../Hooks/useGetExRate'
import ExRateHistory from './ExRateHistory'
import LiveExRateDisplay from './LiveExRateDisplay'
import { ReducerProps, StreamType } from '../../Types/PropTypes'

const ching = require('../../Assets/ching.mp3')

const GREEN = '#2ead4b'
const kuveytFee = 0.998

export default function Kuveyt({ state }: { state: ReducerProps }) {
    // Custom hook
    const { kuveytExRateUSD, kuveytIsLive } = useGetExRate()

    // Global state
    const { wiseUSDsent, wiseExRateAfterFees, wiseTRYsent } = state

    // Local state
    const [stream, setStream] = useState<StreamType>([])
    const [lastUpdateStatus, setLastUpdateStatus] = useState<'increased' | 'decreased' | 'same'>('same')
    const [count, setCount] = useState(1)
    if (process.env.NODE_ENV === 'development') {
        console.log('🚀updating....')
    }

    // const audio = new Audio(ching)
    // audio.play()

    // Update exchange rates every 5 seconds
    useEffect(() => {
        if (kuveytExRateUSD.sell === 0) return
        setStream([...stream, { buy: kuveytExRateUSD.buy, sell: kuveytExRateUSD.sell, date: new Date().toISOString(), count }])
        setCount(count + 1)

        if (stream.length < 3) return
        if (kuveytExRateUSD.sell > stream.slice(-2)[0].sell) {
            setLastUpdateStatus('increased')
        } else if (kuveytExRateUSD.sell < stream.slice(-2)[0].sell) {
            setLastUpdateStatus('decreased')
        } else {
            setLastUpdateStatus('same')
        }
    }, [kuveytExRateUSD])

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
                        <ExRateHistory stream={stream} kuveytExRateUSD={kuveytExRateUSD} />
                    </Box>

                    {/* Current USD/TRY exchange rate */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Current USD/TRY exchange rate</Typography>
                        {kuveytIsLive ? <LiveExRateDisplay kuveytIsLive={kuveytIsLive} kuveytExRateUSD={kuveytExRateUSD.sell} lastUpdateStatus={lastUpdateStatus} /> : 'loading...'}
                    </Box>

                    {/* Exchange rate to break even */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Exchange rate to break even</Typography>
                        <Typography variant="number">{wiseExRateAfterFees ? (wiseExRateAfterFees * kuveytFee).toFixed(4) : ''}</Typography>
                    </Box>

                    {/* Exchange rate difference */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Exchange rate difference</Typography>
                        <Typography variant="number" color={getExRateDiff(kuveytExRateUSD.sell, wiseExRateAfterFees) > 0 ? GREEN : 'red'}>
                            {wiseExRateAfterFees !== 0 ? Math.abs(getExRateDiff(kuveytExRateUSD.sell, wiseExRateAfterFees)).toFixed(2) : ''}
                        </Typography>
                    </Box>

                    {/* USD to be recieved at current  rate */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">USD to be recieved at current rate</Typography>
                        <Typography variant="number">{wiseTRYsent !== 0 ? `${((wiseTRYsent / kuveytExRateUSD.sell) * kuveytFee).toFixed(2)} USD` : ''}</Typography>
                    </Box>

                    {/* Gain */}
                    {wiseTRYsent && wiseUSDsent ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">{getGain(wiseTRYsent, kuveytExRateUSD, wiseUSDsent) > 0 ? 'Gain' : 'Loss'}</Typography>
                            <Typography variant="number" color={getGain(wiseTRYsent, kuveytExRateUSD, wiseUSDsent) > 0 ? GREEN : 'red'}>
                                {Math.abs(getGain(wiseTRYsent, kuveytExRateUSD, wiseUSDsent)).toFixed(2)} USD
                            </Typography>
                        </Box>
                    ) : null}
                </CardContent>
            </Card>

            {process.env.NODE_ENV === 'development' ? (
                <Box>
                    <p>DEBUG</p>
                    <p></p>
                    <Box>
                        {stream.map((a) => (
                            <div key={a.count}>
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

    function getExRateDiff(currentRate: number, rateAfterFees: number): number {
        return (currentRate - rateAfterFees * kuveytFee) * -1
    }

    function getGain(amountReceivedTr: number, currentRate: { buy: number; sell: number }, dollarSent: number): number {
        return (amountReceivedTr / currentRate.sell) * kuveytFee - dollarSent
    }
}
