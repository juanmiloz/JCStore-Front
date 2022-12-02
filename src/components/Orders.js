import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

import { CRUDService, ORDERS } from '../service/CRUDService';
import { ROLE_ADMIN } from '../constants/Roles';
import { Button } from '@mui/material';

const ORDER_UPDATED_MSG = "The order's status has been updated successfully!"

function isAdmin(roleId){
    return roleId === ROLE_ADMIN;
}

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState(null)
    const [newStatus, setNewStatus] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setNewStatus(event.target.value || '');
    };

    const updateOrder = () => {

        const orderStatus = {"status": newStatus}
        CRUDService.patch(currentOrder.orderId, orderStatus, ORDERS).then( (response) => {
            alert(ORDER_UPDATED_MSG)
        });

    }

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser")).id
        if(isAdmin(id)){
            CRUDService.getAll(ORDERS)
            .then(async (res) => {
                setOrders(res)
            })
        }else{
            CRUDService.getOne(ORDERS, 'users/' + id)
            .then(async (res) => {
                setOrders(res)
            })
        }
    })


    return (
        <div className='Order'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Order Id</b></TableCell>
                            <TableCell align="right"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Total</b></TableCell>
                            <TableCell align="right"><b>User Id</b></TableCell>
                            <TableCell align="right"><b>Items</b></TableCell>
                            <TableCell align="right"><b></b></TableCell>
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
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => {
                                        handleClickOpen()
                                        setCurrentOrder(order)
                                    }}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Order"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to edit the order's status?
                    </DialogContentText>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
                            <Select
                                native
                                value={newStatus}
                                onChange={handleChange}
                                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                <option value={"PENDING"}>PENDING</option>
                                <option value={"COMPLETED"}>COMPLETED</option>
                                <option value={"SEND"}>SEND</option>
                                <option value={"CANCELED"}>CANCELED</option>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        updateOrder()
                        handleClose()
                    }}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
