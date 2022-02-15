import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useState } from 'react'
import Typography from '../MUI/CustomTypography'
import wise from '../Assets/wise.svg'
import { exchangeRateAfterFeeCut, tryReceivedFn } from '../Utilities'
import { ReducerProps } from '../Types/PropTypes'

export default function Wise({ state, setState }: { state: ReducerProps; setState: React.Dispatch<ReducerProps> }) {
    // Global state
    const { wiseUSDsent, wiseExRateAfterFees, wiseTRYsent } = state

    // Local state
    const [wiseFees, setWiseFees] = useState<number>(0)
    const [exchangeRate, setExchangeRate] = useState<number>(0)
    const [wiseFeesInPercentage, setWiseFeesInPercentage] = useState<string | null>(null)

    // Set fees in percentage
    useEffect(() => {
        if (wiseUSDsent && wiseFees) {
            setWiseFeesInPercentage(((wiseFees / wiseUSDsent) * 100).toFixed(2))
        } else {
            setWiseFeesInPercentage(null)
        }
    }, [wiseUSDsent, wiseFees])

    // Set exchange rate after fees applied and TRY to be recieved
    useEffect(() => {
        // If missing any of the below, clear the state calculated with those values
        if (!wiseUSDsent || !wiseFees || !exchangeRate) {
            setState({ ...state, wiseExRateAfterFees: 0, wiseTRYsent: 0 })
        }

        if (wiseUSDsent && wiseFees && exchangeRate) {
            setState({
                ...state,
                wiseExRateAfterFees: exchangeRateAfterFeeCut(exchangeRate, wiseFees, wiseUSDsent), //
                wiseTRYsent: tryReceivedFn(exchangeRate, wiseFees, wiseUSDsent),
            })
        }
    }, [wiseUSDsent, wiseFees, exchangeRate])

    // Alert
    // useEffect(() => {
    //     if (exchangeRate[1] > 13.7) {
    //         alert('alert')
    //     }
    // }, [exchangeRate])

    return (
        <Card sx={{ width: 500 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <img alt="Wise" src={wise} style={{ width: 100 }} />
                <Box display="flex" gap={2}>
                    {/* Amount being sent */}
                    <TextField
                        onChange={(e) => {
                            setState({ ...state, wiseUSDsent: parseFloat(e.target.value) || 0 })
                        }}
                        size="small"
                        label="Amount being sent"
                        variant="outlined"
                        sx={{ width: 170 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                    {/* Fees */}
                    <TextField
                        onChange={(e) => {
                            setWiseFees(parseFloat(e.target.value) || 0)
                        }}
                        size="small"
                        label="Fees"
                        variant="outlined"
                        sx={{ width: 100 }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                    {/* Exchange rate */}
                    <TextField
                        onChange={(e) => {
                            setExchangeRate(parseFloat(e.target.value) || 0)
                        }}
                        size="small"
                        label="Exchange rate"
                        variant="outlined"
                        sx={{ width: 130 }}
                    />
                </Box>

                {/* Fees in percentage */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant="body2">Fees in percentage</Typography>
                    <Typography variant="number"> {wiseFeesInPercentage ? `%${wiseFeesInPercentage}` : null}</Typography>
                </Box>

                {/* Exchange rate after fees applied */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant="body2">Exchange rate after fees applied</Typography>
                    <Typography variant="number">{wiseExRateAfterFees !== 0 ? wiseExRateAfterFees.toFixed(4) : null}</Typography>
                </Box>

                {/* Amount to be received */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 24 }}>
                    <Typography variant="body2">Amount to be received </Typography>
                    <Typography variant="number">{wiseTRYsent !== 0 ? `${wiseTRYsent.toFixed(2)} TRY` : null}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
