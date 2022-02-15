import Grid from '@mui/material/Grid'
import { useReducer } from 'react'
import Typography from './MUI/CustomTypography'
import Wise from './Components/Wise'
import { ReducerProps } from './Types/PropTypes'
import Kuveyt from './Components/Kuveyt'

const initialState: ReducerProps = { tryReceived: 0, usdSent: 0, exRateAfterFees: 0 }

function reducer(currentState: ReducerProps, newState: ReducerProps): ReducerProps {
    return { ...currentState, ...newState }
}

function App() {
    const [state, setState] = useReducer(reducer, initialState)

    return (
        <Grid container spacing={2} direction="column" alignContent="center">
            <Grid item mt={4}>
                <Typography variant="h4" component="h1">
                    Conversion calculation
                </Typography>

                <Typography variant="body1" width="500px">
                    Provide transfer information to calculate the buy back exchange rate to break even.
                </Typography>
            </Grid>

            <Grid item>
                <Wise state={state} setState={setState} />
            </Grid>

            <Grid item>
                <Kuveyt state={state} />
            </Grid>
        </Grid>
    )
}

export default App
