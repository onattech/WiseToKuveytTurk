import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import Typography from '../../MUI/CustomTypography'
import { StreamType, CurrentExRateType } from '../../Types/PropTypes'

const GREEN = '#65CA75'

export default function ExRateStream({ stream, currentExRate }: { stream: StreamType; currentExRate: CurrentExRateType }) {
    return (
        <Box display="flex" gap="8px" justifyContent="flex-end" pt={1} ml="auto">
            <ExRateBox stream={stream} currentExRate={currentExRate} minutes={60} />
            <ExRateBox stream={stream} currentExRate={currentExRate} minutes={30} />
            <ExRateBox stream={stream} currentExRate={currentExRate} minutes={10} />
            <ExRateBox stream={stream} currentExRate={currentExRate} minutes={5} />
            <ExRateBox stream={stream} currentExRate={currentExRate} minutes={1} />
        </Box>
    )
}

function ExRateBox({ stream, currentExRate, minutes }: { stream: StreamType; currentExRate: CurrentExRateType; minutes: number }) {
    const [updateStatus, setUpdateStatus] = useState('same')

    useEffect(() => {
        if (stream.length < minutes * 12 + 1) return

        if (currentExRate.sell > stream?.at(-12 * minutes - 1)!.sell) {
            setUpdateStatus('increased')
        } else if (currentExRate.sell < stream?.at(-12 * minutes - 1)!.sell) {
            setUpdateStatus('decreased')
        } else {
            setUpdateStatus('same')
        }
    }, [currentExRate, minutes, stream])

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
            <Typography>
                {stream?.at(-12 * minutes - 1)!.sell}
                {/* {` ${stream?.at(-12 * minutes - 1)![3]}`} */}
            </Typography>

            {/* <Typography>{new Date(stream?.at(-12 * minutes - 1)![2]).toLocaleTimeString()}</Typography> */}
        </Paper>
    )
}

/**
 * Returns the exchange rate difference between now and the provided minute mark.
 * @example
 * ==> 0.12
 */
function rateDiff(stream: StreamType, minutes: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-unsafe-optional-chaining
    return Math.abs(stream?.at(-12 * minutes - 1)!.sell - stream?.at(-1)!.sell).toFixed(2)
}
