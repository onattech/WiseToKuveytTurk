import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Typography from '../CustomTypography';

const GREEN = '#65CA75';

export default function ExRateDeltas({ stream, currentExRate }) {
    return (
        <Box display='flex' gap='8px' justifyContent='flex-end' pt={1} ml='auto'>
            <Deltas stream={stream} currentExRate={currentExRate} minutes={60} />
            <Deltas stream={stream} currentExRate={currentExRate} minutes={30} />
            <Deltas stream={stream} currentExRate={currentExRate} minutes={10} />
            <Deltas stream={stream} currentExRate={currentExRate} minutes={5} />
            <Deltas stream={stream} currentExRate={currentExRate} minutes={1} />
        </Box>
    );
}

function Deltas({ stream, currentExRate, minutes }) {
    const [updateStatus, setUpdateStatus] = useState('same');

    useEffect(() => {
        if (stream.length < minutes * 12 + 1) return;

        if (currentExRate[1] > stream?.at(-12 * minutes - 1)[1]) {
            setUpdateStatus('increased');
        } else if (currentExRate[1] < stream?.at(-12 * minutes - 1)[1]) {
            setUpdateStatus('decreased');
        } else {
            setUpdateStatus('same');
        }
    }, [currentExRate, minutes, stream]);

    if (stream.length < minutes * 12 + 1) return null;
    return (
        <Paper variant='outlined' sx={{ padding: '4px', position: 'relative' }}>
            <Typography sx={{ position: 'absolute', background: 'white', top: -8, px: '3px', left: -10, rotate: '-25deg', color: 'orangered' }}>{minutes}m</Typography>
            <Typography sx={{ textAlign: 'right' }}>
                {rateDiff(stream, minutes)}
                {updateStatus !== 'same' ? (
                    <FontAwesomeIcon
                        color={updateStatus === 'increased' ? GREEN : updateStatus === 'decreased' ? 'red' : 'gray'}
                        height='5px'
                        fontSize={16}
                        icon={faLongArrowAltUp}
                        style={{ rotate: updateStatus === 'decreased' ? '180deg' : '' }}
                    />
                ) : (
                    <span style={{ color: 'gray', marginLeft: 1 }}>●</span>
                )}
            </Typography>
            <Typography>
                {stream?.at(-12 * minutes - 1)[1]}
                {/* {' ' + stream?.at(-12 * minutes - 1)[3]} */}
            </Typography>
            {/* <Typography>{new Date(stream?.at(-12 * minutes - 1)[2]).toLocaleTimeString()}</Typography> */}
        </Paper>
    );
}

/**
 * Returns the exchange rate difference between now and the provided minute mark.
 * @example
 * ==> 0.12
 */
function rateDiff(stream, minutes) {
    return Math.abs(stream?.at(-12 * minutes - 1)[1] - stream?.at(-1)[1]).toFixed(2);
}
