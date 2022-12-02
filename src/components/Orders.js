import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import { CRUDService, ORDERS } from '../service/CRUDService';


export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        CRUDService.getAll(ORDERS)
        .then(async (res)=>{
            setOrders(res)
        })
    })


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">User Id</TableCell>
                        <TableCell align="right">Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.orderId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.orderId}
                            </TableCell>
                            <TableCell align="right">{order.status}</TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell align="right">{order.userId}</TableCell>
                            <TableCell align="right">{"Items"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
