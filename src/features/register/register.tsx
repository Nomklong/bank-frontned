import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import PageHeading from "../../app/component/PageHeading";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {asyncLogin, getLoginStatus} from "../../app/store/user/userSlice";
import {LoginType, RegisterType} from "../../app/apis/login";
import {useHistory} from "react-router-dom";

export function Register(): React.ReactNode {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [pending, setPending] = React.useState(true);
    const dispatch = useAppDispatch();
    const handleLogin = () => {
        setPending(false);
    };

    // const history = useHistory();

    React.useEffect(() => {
        if (pending) {
            return;
        }

        const parameters: RegisterType = {
            email,
            password,
            first_name,
            last_name,
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
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <TextField
                        id="outlined-textarea"
                        label="Firstname"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Firstname"
                        fullWidth
                        value={password}
                    />

                    <TextField
                        id="outlined-textarea"
                        label="Lastname"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Lastname"
                        fullWidth
                        value={password}
                    />

                    <TextField
                        id="outlined-textarea"
                        type="password"
                        label="Password"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Password"
                        fullWidth
                        value={password}
                    />
                </Box>
            </Grid>
            <Grid  alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>
                <Button variant="contained" color="success" onClick={handleLogin}>register</Button>
            </Grid>
        </Grid>
    );
}
