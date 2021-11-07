import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import PageHeading from "../../app/component/PageHeading";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {asyncLogin, getLoginStatus, getToken} from "../../app/store/user/userSlice";
import {LoginType} from "../../app/apis/login";
import {useHistory} from "react-router-dom";

export function Login(): React.ReactNode {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pending, setPending] = React.useState(true);
    const loginStatus = useAppSelector(getLoginStatus);
    const wasSigned = useAppSelector(getToken);
    const dispatch = useAppDispatch();
    const handleLogin = () => {
        setPending(false);
    };

    const history = useHistory();

    React.useEffect(() => {
        if (loginStatus !== 'success' && !wasSigned) {
            return;
        }

        history.push('/profile');
    }, [loginStatus]);
    React.useEffect(() => {
        if (pending) {
            return;
        }

        const parameters: LoginType = {
            email,
            password,
        };
        dispatch(asyncLogin(parameters));

        setPending(true);
    }, [dispatch, password, email, pending]);
    return (
        <Grid
            alignItems="center"
            direction="column"
            justifyContent="center"
            wrap="nowrap"
            container
        >
            <PageHeading mb={2} title="Register" />
            <Grid alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>
                <Box mt={12}
                     component="form"
                     noValidate
                     autoComplete="off">
                    <TextField
                        error={loginStatus === "error"}
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        id="outlined-textarea"
                        type="password"
                        error={loginStatus === "error"}
                        helperText={loginStatus === "error" ? 'User or password mismatch' : ''}
                        label="Password"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Password"
                        fullWidth
                        value={password}
                    />
                </Box>
            </Grid>
            <Grid  alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>

                <Button variant="contained" color="success" onClick={handleLogin}>login</Button>
                <Button variant="contained" color="info" href='/register'>register</Button>

            </Grid>
        </Grid>
    );
}
