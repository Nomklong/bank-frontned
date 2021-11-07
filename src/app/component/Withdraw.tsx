import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from 'react';

import PageHeading from "../../app/component/PageHeading";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../hooks";
import SimpleReactValidator from "simple-react-validator";
import type { WalletDWType } from "../apis/wallet";
import { withdraw } from "../apis/wallet";
import { getToken } from "../store/user/userSlice";

export function Withdraw(): JSX.Element {
    const validate = new SimpleReactValidator({
        validators: {
            banknote: {  // name the rule
                message: 'The balance is invalid.',
                rule: (val: number) => {
                    return  val >= 100 && val % 100 === 0;
                },
            }
        }
    });
    const [balance, setBalance] = React.useState(0);
    const [open, setSuccessWithdraw] = React.useState(false);
    const [fail, setFailWithdraw] = React.useState(false);
    const [pending, setPending] = React.useState(true);
    const dispatch = useAppDispatch();
    const handleDeposit = () => {
        setPending(false);
    };
    const [inputError, setInputErrorMessage] = React.useState({
        balance: '',
    });
    const token = useAppSelector(getToken);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessWithdraw(false);
    };

    const handleCloseFail = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setFailWithdraw(false);
    };

    React.useEffect(() => {
        if (pending) {
            return;
        }

        if (!validate.allValid()) {
            const errorMessages = {
                balance: validate.errorMessages.balance,
            }
            setInputErrorMessage(errorMessages);
            setPending(true);
            return;
        }
        setInputErrorMessage({
            balance: '',
        });
        const parameters: WalletDWType = { balance };

        withdraw(parameters, token).then((data) => {
            setSuccessWithdraw(true);
            setBalance(0);
        }).catch((err) => {
            setFailWithdraw(true);
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
            <PageHeading mb={2} title="Deposit" />
            <Grid alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>
                <Box mt={12}
                     component="form"
                     noValidate
                     autoComplete="off">
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

                    {validate.message('balance', balance, 'required|banknote')}
                </Box>
            </Grid>
            <Grid  alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>

                <Button variant="contained" color="success" onClick={handleDeposit}>Withdraw</Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Deposit successfully.
                </Alert>
            </Snackbar>
            <Snackbar open={fail} autoHideDuration={3000} onClose={handleCloseFail}>
                <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    Deposit failed.
                </Alert>
            </Snackbar>
        </Grid>
    );
}
