import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Chip } from '@mui/material';
import Typography from '../CustomTypography';

export default function LiveExRateDisplay({ isLive, currentExRate, lastUpdateStatus }) {
    console.log('🚀 ~ file: Kuveyt.jsx ~ line 109 ~ NewFunction ~ currentExRate', currentExRate);
    return (
        <Box display='flex' alignItems='center' gap='4px'>
            {isLive ? <Chip label='Live ●' variant='outlined' size='small' sx={{ background: 'white', color: 'green' }} /> : null}
            <Typography variant='number'>{currentExRate}</Typography>
            <FontAwesomeIcon
                color={lastUpdateStatus === 'increased' ? '#65CA75' : 'red'}
                height='5px'
                fontSize={16}
                icon={faLongArrowAltUp}
                style={{
                    opacity: lastUpdateStatus === 'same' ? 0 : 1,
                    rotate: lastUpdateStatus === 'decreased' ? '180deg' : '',
                }}
            />
        </Box>
    );
}
