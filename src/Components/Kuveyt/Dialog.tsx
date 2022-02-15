import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ching = require('../../Assets/ching.mp3')

export default function FormDialog({ open, setOpen, sell }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; sell: number }) {
    const [notifyRate, setNotifyRate] = React.useState(0)
    const [isSet, setIsSet] = React.useState(false)
    console.log('🚀 ~ file: Dialog.tsx ~ line 15 ~ FormDialog ~ isSet', isSet)
    console.log('🚀 ~ file: Dialog.tsx ~ line 12 ~ FormDialog ~ exRate', Number(notifyRate))
    const notifyRef = React.useRef('')

    function handleSet() {
        setOpen(false)
        if (Number(notifyRef.current) > sell) {
            setNotifyRate(Number(notifyRef.current))
            setIsSet(true)
        }
    }

    function handleChange(e: any) {
        notifyRef.current = e.target.value
    }

    function handleClear() {
        setOpen(false)
        notifyRef.current = ''
        setNotifyRate(0)
        setIsSet(false)
    }

    const audio = new Audio(ching)
    React.useEffect(() => {
        if (isSet && notifyRate <= sell) {
            audio.play()
            setIsSet(false)
        }
    }, [notifyRate, sell])

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="notification-title">Notification</DialogTitle>
                <DialogContent>
                    <DialogContentText>Set the USD/TRY buy exchange rate you would like to get notified at.</DialogContentText>
                    <TextField //
                        inputRef={notifyRef}
                        onChange={handleChange}
                        autoFocus
                        defaultValue={notifyRate !== 0 ? notifyRate.toFixed(4) : ''}
                        variant="outlined"
                        margin="dense"
                        id="exrate"
                        label="Exchange rate"
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClear} color="primary">
                        Clear
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSet} color="primary">
                        Set
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
