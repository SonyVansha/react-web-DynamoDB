import { useState, useEffect } from 'react';
import { Box, TableHead, Typography, Table, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';

import axios from 'axios';

const Component = styled(Box)`
    width: 80%;
    margin: 50px auto;
    & > h4 {
        margin-bottom: 20px;
    };
    & > div > table > thead {
        background-color: #000
    }
    & > div > table > thead > tr > th {
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 600;
    }
    & > div > table > tbody > tr > td {
        font-size: 20px;
    }
`;

// const defaultObj = [{
//     id: 101,
//     name: 'Sony Vansha',
//     email: 'example@gmail.com',
//     phone: '6176412798',
//     salary: 222000,
//     age: 19
// }];

const Users = () => {

    // const [users, setUsers] = useState(defaultObj);
    const [users, setUsers] = useState([]);

    // const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_URL);
            setUsers(JSON.parse(response.data.body).Items);
        }
        getData();
    }, [])

    const removeEntry = (id) => {
        const UpdateUsers =  users.filter(user => user.id !== id);
        setUsers(UpdateUsers);
    }

    return (
        <Component>
            <Typography variant='h4'>Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            users.map( user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.salary}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell><Button variant='contained' color='error' onClick={() => removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    )
}

export default Users;