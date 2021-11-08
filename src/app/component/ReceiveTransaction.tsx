import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../hooks";
import {TransactionGetType} from "../apis/transaction";
import {fetchTransactions, getTransactions, getTransactionStatus} from "../store/user/transactionSlice";
import {useState} from "react";

function createData(
    createdAt: string,
    from_wallet_number: number,
    current_balance: number,
    action: string,
    to_wallet_number: number,
    transfer_balance: number,
    _id: number
) {
    return { createdAt, from_wallet_number, current_balance, action, to_wallet_number, transfer_balance, id: _id };
}

let rows: {
    id: any;
    createdAt: string; from_wallet_number: number; current_balance: number; action: string; to_wallet_number: number; transfer_balance: number; }[] = [];

export function ReceiveTransaction() {
    const status = useAppSelector(getTransactionStatus);
    const transactions = useAppSelector(getTransactions);
    const dispatch = useAppDispatch();

    const [data, setData] = useState(rows);
    React.useEffect(() => {
        const params: TransactionGetType = {
            action: 'receive',
        }
        dispatch(fetchTransactions(params));
    }, [dispatch]);


    React.useEffect(() => {
        if (status !== 'fulfilled'){
            return;
        }
        rows = [];
        transactions.map((value) => {
            // @ts-ignore
            rows.push(createData(value?.createdAt, value?.from_wallet_number, value?.current_balance, value?.action, value?.to_wallet_number, value?.transfer_balance));
        });
        setData(rows);
    }, [status, transactions]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Receive date</TableCell>
                        <TableCell align="right">To number</TableCell>
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="right">From number</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.from_wallet_number}</TableCell>
                            <TableCell align="center">receive</TableCell>
                            <TableCell align="right">{row.to_wallet_number}</TableCell>
                            <TableCell align="right">{row.transfer_balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

