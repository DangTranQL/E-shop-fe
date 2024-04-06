import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPendingOrder } from '../../features/order/orderSlice';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../app/apiService';

function CartPage() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [numChange, setNumChange] = useState(0);

    const buttonStyle = {backgroundColor: 'black', color: 'white', fontSize: '1.5em', weight: 600};

    const { pendingOrder, pendingItems, isLoading } = useSelector(
        (state) => state.order,
        shallowEqual
    );

    const updateItem = async (orderId, itemid, itemQuantity, change) => {
        try{
            if (itemQuantity + change <= 0) {
                await apiService.delete(`/orders/${orderId}/item/${itemid}`);
                setNumChange(numChange + 1);
                return;
            }
            await apiService.patch(`/orders/${orderId}/item/${itemid}`, { change });
            setNumChange(numChange + 1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId) {
            dispatch(getPendingOrder());
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [userId, navigate, numChange, dispatch]);

    return (
        <Container sx={{ my: 3 }}>
            {pendingOrder?.[0] ? (<>
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ mb: 2, my: 3 }}>
                    Order Items
                </Typography>
                <Button component={Link} to={`/payment/${pendingOrder?.[0]?._id}`} sx={{ backgroundColor: "darkgreen", color: "white" }}>
                    CHECKOUT
                </Button>
            </Stack>
            <Box sx={{ position: "relative", height: 1 }}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {pendingItems && (
                            pendingItems.map((item, index) => (
                                <Box sx={{ display: "flex", direction: "row" }} mb={5}>
                                    <Box component="img"
                                        sx={{
                                            width: 0.1,
                                            height: 0.1,
                                        }}
                                        src={item.image}
                                        alt="orderItem"
                                    />
                                    <Box ml={5}>
                                        <Typography variant="h8">{item.title}</Typography>
                                        <Typography variant="body1">${item.itemPrice * item.quantity}</Typography>

                                        <Box sx={{ display: "flex", direction: "row", alignItems: "center" }}>
                                            <Button sx={{ mr: 3 }} style={buttonStyle} onClick={() => updateItem(pendingOrder?.[0]?._id, item?._id, item.quantity, 1)}>+</Button>
                                            <Typography sx={{ mr: 3 }} variant="body1">Quantity: {item.quantity}</Typography>
                                            <Button style={buttonStyle} onClick={() => updateItem(pendingOrder?.[0]?._id, item?._id, item.quantity, -1)}>-</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </>
                )}
            </Box>
            </>) : (
                <Typography variant="h4" sx={{ mb: 2, my: 3 }}>
                    You have no order
                </Typography>
            )}
        </Container>
    );
};


export default CartPage;