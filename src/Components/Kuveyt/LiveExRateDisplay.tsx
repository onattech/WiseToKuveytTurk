import { Box, Chip } from '@mui/material'
import Typography from '../../MUI/CustomTypography'
import Arrow from '../../MUI/Arrow'

export default function LiveExRateDisplay({ isLive, currentExRate, lastUpdateStatus }: { isLive: boolean; currentExRate: number; lastUpdateStatus: string }) {
    return (
        <Box display="flex" alignItems="center" gap="4px">
            {isLive ? <Chip label="Live ●" variant="outlined" size="small" sx={{ background: 'white', color: 'green' }} /> : null}
            <Typography variant="number">{currentExRate.toFixed(4)}</Typography>
            <Arrow lastUpdateStatus={lastUpdateStatus} />
        </Box>
    )
}
