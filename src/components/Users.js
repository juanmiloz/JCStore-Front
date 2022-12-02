import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import { CRUDService, USERS } from '../service/CRUDService';

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        CRUDService.getAll(USERS)
            .then(async (res) => {
                setUsers(res)
            })
    })


    return (
        <div className='Users'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>User Id</b></TableCell>
                            <TableCell align="right"><b>First Name</b></TableCell>
                            <TableCell align="right"><b>Phone</b></TableCell>
                            <TableCell align="right"><b>Email</b></TableCell>
                            <TableCell align="right"><b>Password</b></TableCell>
                            <TableCell align="right"><b>Address</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.phone}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.password}</TableCell>
                                <TableCell align="right">{user.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
