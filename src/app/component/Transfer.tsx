import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from 'react';

import PageHeading from "../../app/component/PageHeading";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../hooks";
import SimpleReactValidator from "simple-react-validator";
import type { WalletTransferType} from "../apis/wallet";
import { transfer } from "../apis/wallet";
import {getToken} from "../store/user/userSlice";

export function Transfer(): JSX.Element {
    const validate = new SimpleReactValidator();
    const [balance, setBalance] = React.useState(0);
    const [transfer_number, setTransferNumber] = React.useState('');
    const [open, setSuccessTransfer] = React.useState(false);
    const [fail, setFailTransfer] = React.useState(false);
    const [pending, setPending] = React.useState(true);
    const dispatch = useAppDispatch();
    const handleDeposit = () => {
        setPending(false);
    };
    const [inputError, setInputErrorMessage] = React.useState({
        balance: '',
        transfer_number: '',
    });
    const token = useAppSelector(getToken);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessTransfer(false);
    };

    const handleCloseFail = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setFailTransfer(false);
    };

    React.useEffect(() => {
        if (pending) {
            return;
        }

        if (!validate.allValid()) {
            const errorMessages = {
                balance: validate.errorMessages.balance,
                transfer_number: validate.errorMessages.transfer_number,
            }
            setInputErrorMessage(errorMessages);
            setPending(true);
            return;
        }
        setInputErrorMessage({
            balance: '',
            transfer_number: '',
        });
        const parameters: WalletTransferType = { balance, transfer_number };

        transfer(parameters, token).then((data) => {
            setSuccessTransfer(true);
            setBalance(0);
            setTransferNumber('');
        }).catch((err): void => {
            setFailTransfer(true);
        });
        setPending(true);
    }, [dispatch, balance, pending, validate, token]);
    return (
        <Grid
            alignItems="center"
            direction="column"
            justifyContent="center"
            wrap="nowrap"
            container
        >
            <PageHeading mb={2} title="Transfer" />
            <Grid alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>
                <Box mt={12}
                     component="form"
                     noValidate
                     autoComplete="off">
                    <TextField
                        error={inputError.transfer_number !== ''}
                        helperText={inputError.transfer_number ?? ''}
                        id="outlined-textarea"
                        label="Wallet number"
                        placeholder="Wallet number"
                        fullWidth
                        value={transfer_number}
                        onChange={event => setTransferNumber(event.target.value)}
                    />
                    {validate.message('transfer_number', transfer_number, 'required|size:10,string')}
                    <TextField
                        error={inputError.balance !== ''}
                        helperText={inputError.balance ?? ''}
                        id="outlined-textarea"
                        label="Balance"
                        placeholder="Balance"
                        fullWidth
                        type="number"
                        value={balance}
                        onChange={event => setBalance(parseInt(event.target.value))}
                    />

                    {validate.message('balance', balance, 'required|min:1,num')}
                </Box>
            </Grid>
            <Grid  alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>

                <Button variant="contained" color="success" onClick={handleDeposit}>Transfer</Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Transfer successfully.
                </Alert>
            </Snackbar>
            <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseFail}>
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    Transfer failed.
                </Alert>
            </Snackbar>
        </Grid>
    );
}
