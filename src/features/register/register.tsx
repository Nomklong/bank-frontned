import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import SimpleReactValidator from "simple-react-validator";
import PageHeading from "../../app/component/PageHeading";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {asyncRegister, getLoginStatus, getToken} from "../../app/store/user/userSlice";
import { RegisterType } from "../../app/apis/login";
import {useHistory} from "react-router-dom";

export function Register(): React.ReactNode {
    const validate = new SimpleReactValidator();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setPasswordConfirmation] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [pending, setPending] = React.useState(true);
    const loginStatus = useAppSelector(getLoginStatus);
    const history = useHistory();
    const wasSigned = useAppSelector(getToken);

    React.useEffect(() => {
        if (loginStatus !== 'success' && !wasSigned) {
            return;
        }

        history.push('/profile');
    }, [loginStatus]);
    const [inputError, setInputErrorMessage] = React.useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
    });
    const dispatch = useAppDispatch();
    const handleRegister = () => {
        setPending(false);
    };

    React.useEffect(() => {
        if (pending) {
            return;
        }

        if (!validate.allValid()) {
            const errorMessages = {
                email: validate.errorMessages.email,
                first_name: validate.errorMessages.first_name,
                last_name: validate.errorMessages.last_name,
                password: validate.errorMessages.password,
                password_confirmation: validate.errorMessages.password_confirmation,
            }
            setInputErrorMessage(errorMessages);
            setPending(true);
            return;
        }
        setInputErrorMessage({
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
        });
        const parameters: RegisterType = {
            email,
            password,
            first_name,
            last_name,
        };
        dispatch(asyncRegister(parameters));

        setPending(true);
    }, [dispatch, password, email, pending, first_name, last_name, password_confirmation]);
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
                        error={inputError.email !== ''}
                        helperText={inputError.email ?? ''}
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    {validate.message('email', email, 'required|email')}
                    <TextField
                        error={inputError.first_name !== ''}
                        helperText={inputError.first_name ?? ''}
                        id="outlined-textarea"
                        label="Firstname"
                        onChange={event => setFirstName(event.target.value)}
                        placeholder="Firstname"
                        fullWidth
                        value={first_name}
                    />

                    {validate.message('first_name', first_name, 'required')}
                    <TextField
                        error={inputError.last_name !== ''}
                        helperText={inputError.last_name ?? ''}
                        id="outlined-textarea"
                        label="Lastname"
                        onChange={event => setLastName(event.target.value)}
                        placeholder="Lastname"
                        fullWidth
                        value={last_name}
                    />

                    {validate.message('last_name', last_name, 'required')}
                    <TextField
                        error={inputError.password !== ''}
                        helperText={inputError.password ?? ''}
                        id="outlined-textarea"
                        type="password"
                        label="Password"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Password"
                        fullWidth
                        value={password}
                    />
                    {validate.message('password', password, `required|in:${password_confirmation}`)}
                    <TextField
                        error={inputError.password_confirmation !== ''}
                        helperText={inputError.password_confirmation ?? ''}
                        id="outlined-textarea"
                        type="password"
                        label="password confirmation"
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        placeholder="Password conformation"
                        fullWidth
                        value={password_confirmation}
                    />
                    {validate.message('password_confirmation', password_confirmation, `required|in:${password}`)}
                </Box>
            </Grid>
            <Grid  alignContent="middle" alignItems="center" justifyContent="center" xs={9} container item>
                <Button variant="contained" color="success" onClick={handleRegister}>register</Button>
            </Grid>
        </Grid>
    );
}
