import React, { useEffect, useState } from 'react';
import { Box, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCompletedOrders } from '../../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';

function OrdersPage() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = (event, value) => {
        setPage(value);
    }

    const { completedOrders, numberOfOrders, isLoading } = useSelector(
        (state) => state.order,
        shallowEqual
    );

    useEffect(() => {
        if (userId) {
            dispatch(getCompletedOrders({page, limit}));
        } else {
            navigate('/login');
        }
    }, [page, dispatch, userId, navigate]);

    return (
        <Container>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <Box>
                    <TableContainer sx={{mt: 3 }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow style={{ backgroundColor: "black", color: "white" }}>
                                    <TableCell style={{ color: 'white' }}>ID</TableCell>
                                    <TableCell style={{ color: 'white' }}>Status</TableCell>
                                    <TableCell style={{ color: 'white' }}>Address</TableCell>
                                    <TableCell style={{ color: 'white' }}>Date</TableCell>
                                    <TableCell style={{ color: 'white' }}>Price</TableCell>
                                    <TableCell style={{ color: 'white' }}>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedOrders?.map((order, index) => (
                                    <TableRow 
                                        key={order._id}
                                        style={{ backgroundColor: index % 2 === 1 ? 'gray' : 'white' }}
                                    >
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell>
                                            <button onClick={() => navigate(`${order._id}`)}>Details</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                        <Pagination count={Math.ceil(numberOfOrders/10)} color="primary" onChange={handleChange}/>
                    </Box>
                </Box>
            )}
        </Container>
    );
};


export default OrdersPage;