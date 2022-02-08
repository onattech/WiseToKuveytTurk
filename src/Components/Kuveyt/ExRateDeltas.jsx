import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const GREEN = '#65CA75';

export default function ExRateDeltas({ stream, currentExRate }) {
    return (
        <>
            <Box display='flex' gap='8px'>
                <Deltas stream={stream} currentExRate={currentExRate} minutes={60} />
                <Deltas stream={stream} currentExRate={currentExRate} minutes={30} />
                <Deltas stream={stream} currentExRate={currentExRate} minutes={10} />
                <Deltas stream={stream} currentExRate={currentExRate} minutes={5} />
                <Deltas stream={stream} currentExRate={currentExRate} minutes={1} />
            </Box>
        </>
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
        <Box>
            {minutes}m{' '}
            <FontAwesomeIcon
                color={updateStatus === 'increased' ? GREEN : updateStatus === 'decreased' ? 'red' : 'gray'}
                height='5px'
                fontSize={16}
                icon={faLongArrowAltUp}
                style={{
                    opacity: updateStatus === 'same' ? 0 : 1,
                    rotate: updateStatus === 'decreased' ? '180deg' : '',
                }}
            />
        </Box>
    );
    // } else {
    // return null;
    // }
}
