import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, Pagination } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCompletedOrders } from '../../features/order/orderSlice';
import Order from '../../features/order/Order';
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
    }, [page]);

    return (
        <Container>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        {completedOrders?.map((order, index) => (
                            <Card key={index}>
                            <CardContent onClick={() => navigate(`${order._id}`)}>
                                <Order order={order}/>
                            </CardContent>
                            </Card>
                        ))}
                        </Grid>
                    </Grid> 
                    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                        <Pagination count={Math.ceil(numberOfOrders/10)} color="primary" onChange={handleChange}/>
                    </Box>
                </Box>
            )}
        </Container>
    );
};


export default OrdersPage;