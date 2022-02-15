import { Box, Chip } from '@mui/material'
import Typography from '../../MUI/CustomTypography'
import Arrow from '../../MUI/Arrow'

type LiveExRateDisplayType = {
    kuveytIsLive: boolean
    kuveytExRateUSD: number
    lastUpdateStatus: string
}

export default function LiveExRateDisplay({ kuveytIsLive, kuveytExRateUSD, lastUpdateStatus }: LiveExRateDisplayType) {
    return (
        <Box display="flex" alignItems="center" gap="4px">
            {kuveytIsLive ? <Chip label="Live ●" variant="outlined" size="small" sx={{ background: 'white', color: 'green' }} /> : null}
            <Typography variant="number">{kuveytExRateUSD.toFixed(4)}</Typography>
            <Arrow lastUpdateStatus={lastUpdateStatus} />
        </Box>
    )
}
