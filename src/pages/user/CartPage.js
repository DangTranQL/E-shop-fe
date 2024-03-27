import React, { useEffect } from 'react';
import { Button, Card, CardContent, Container, Grid } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPendingOrder } from '../../features/order/orderSlice';
import Order from '../../features/order/Order';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pendingOrder, isLoading } = useSelector(
        (state) => state.order,
        shallowEqual
    );

    useEffect(() => {
        if (userId) {
            dispatch(getPendingOrder());
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <Container>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <Grid item xs={6}>
                {pendingOrder?.map((order, index) => (
                    <Card key={index}>
                        <CardContent onClick={() => navigate(`${order._id}`)}>
                            <Order order={order}/>
                        </CardContent>
                        <Button component={Link} to={`/payment/${order._id}`}>
                            CHECKOUT
                        </Button>
                    </Card>
                ))}
                </Grid>
            )}
        </Container>
    );
};


export default CartPage;