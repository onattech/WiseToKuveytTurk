import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import Typography from '../../MUI/CustomTypography'
import { StreamType, CurrentExRateType } from '../../Types/PropTypes'

const GREEN = '#65CA75'

export default function ExRateHistory({ stream, kuveytExRateUSD }: { stream: StreamType; kuveytExRateUSD: CurrentExRateType }) {
    return (
        <Box display="flex" gap="8px" justifyContent="flex-end" pt={1} ml="auto">
            <ExRateBox stream={stream} kuveytExRateUSD={kuveytExRateUSD} minutes={60} />
            <ExRateBox stream={stream} kuveytExRateUSD={kuveytExRateUSD} minutes={30} />
            <ExRateBox stream={stream} kuveytExRateUSD={kuveytExRateUSD} minutes={10} />
            <ExRateBox stream={stream} kuveytExRateUSD={kuveytExRateUSD} minutes={5} />
            <ExRateBox stream={stream} kuveytExRateUSD={kuveytExRateUSD} minutes={1} />
        </Box>
    )
}

function ExRateBox({ stream, kuveytExRateUSD, minutes }: { stream: StreamType; kuveytExRateUSD: CurrentExRateType; minutes: number }) {
    const [updateStatus, setUpdateStatus] = useState('same')

    useEffect(() => {
        if (stream.length < minutes * 12 + 1) return

        if (kuveytExRateUSD.sell > stream.slice(-12 * minutes - 1)[0].sell) {
            setUpdateStatus('increased')
        } else if (kuveytExRateUSD.sell < stream.slice(-12 * minutes - 1)[0].sell) {
            setUpdateStatus('decreased')
        } else {
            setUpdateStatus('same')
        }
    }, [kuveytExRateUSD, minutes, stream])

    if (stream.length < minutes * 12 + 1) return null
    return (
        <Paper variant="outlined" sx={{ padding: '4px', position: 'relative' }}>
            {/* Minute header */}
            <Typography sx={{ position: 'absolute', background: 'white', top: -9, px: '3px', left: -6, color: 'slategray', lineHeight: 1, fontWeight: 'bold' }}>
                {minutes}m
            </Typography>

            {/* Exchange rate difference between now and the provided minute mark */}
            <Typography sx={{ textAlign: 'right' }}>
                {rateDiff(stream, minutes)}
                {updateStatus !== 'same' ? (
                    <FontAwesomeIcon
                        // eslint-disable-next-line no-nested-ternary
                        color={updateStatus === 'increased' ? GREEN : updateStatus === 'decreased' ? 'red' : 'gray'}
                        height="5px"
                        fontSize={16}
                        icon={faLongArrowAltUp}
                        style={{ rotate: updateStatus === 'decreased' ? '180deg' : '' }}
                    />
                ) : (
                    <span style={{ color: 'gray', marginLeft: 1 }}>●</span>
                )}
            </Typography>

            {/* Exchange rate at the provided minute mark */}
            <Typography>{stream.slice(-12 * minutes - 1)[0].sell.toFixed(4)}</Typography>
        </Paper>
    )
}

/**
 * Returns the exchange rate difference between now and the provided minute mark.
 * @example
 * ==> 0.12
 */
function rateDiff(stream: StreamType, minutes: number) {
    return Math.abs(stream.slice(-12 * minutes - 1)[0].sell - stream.slice(-1)[0].sell).toFixed(2)
}
