import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Deposit} from "../../app/component/Deposit";
import {Withdraw} from "../../app/component/Withdraw";
import {Transfer} from "../../app/component/Transfer";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getBalance} from "../../app/store/user/walletSlice";
import {resetStatus, resetToken} from "../../app/store/user/userSlice";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {ReceiveTransaction} from "../../app/component/ReceiveTransaction";
import {TransferTransaction} from "../../app/component/TransferTransaction";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Profile() {
    const [wantLogout, setLogoutState] = useState(false);
    const dispatch = useAppDispatch();
    const history = useHistory();

    React.useEffect(() => {
        async function logout() {
            if (!wantLogout) {
                return;
            }
            localStorage.clear();

            await dispatch(resetToken());
            await dispatch(resetStatus());

            history.push('/login');
        }

        logout();
    }, [dispatch, wantLogout]);

    const handleLogout = () => {
        setLogoutState(true);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const balance = useAppSelector(getBalance);

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 11 }}>
                    Your balance : {balance}
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button variant="contained" color="success" onClick={handleLogout}>logout</Button>
                </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Receive Transaction" {...a11yProps(0)} />
                    <Tab label="Transfer Transaction" {...a11yProps(1)} />
                    <Tab label="Deposit" {...a11yProps(2)} />
                    <Tab label="Withdraw" {...a11yProps(3)} />
                    <Tab label="Transfer" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ReceiveTransaction/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TransferTransaction/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Deposit/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Withdraw/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Transfer/>
            </TabPanel>
        </Box>
        </Box>
    );
}
