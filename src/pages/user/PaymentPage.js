import React, { useEffect } from 'react';
import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import apiService from '../../app/apiService';
import LoadingScreen from '../../components/LoadingScreen';
import { useParams } from 'react-router-dom/dist';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../features/order/orderSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function PaymentPage () {
    const auth = useAuth();
    const params = useParams();
    const dispatch = useDispatch();

    const { selectedOrder, isLoading } = useSelector(
        (state) => state.order,
        shallowEqual
    );

    useEffect(() => {
        if (auth.user?._id) {
            dispatch(getOrder(params.id));
        }
    }, []);


    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Payment Information
            </Typography>
            <Box sx={{ position: "relative", height: 1 }}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {selectedOrder && (
                            <Box sx={{mb: 2}}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Order ID: {selectedOrder._id}
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Total: {selectedOrder.price}
                                </Typography>
                                {/* <TextField id="card" label="Card Number" variant="outlined" sx={{ mb: 2 }} />
                                <TextField id="exp" label="Expiration Date" variant="outlined" sx={{ mb: 2 }} />
                                <TextField id="cvv" label="CVV" variant="outlined" sx={{ mb: 2 }} />
                                <TextField id="name" label="Name on Card" variant="outlined" sx={{ mb: 2 }} />
                                <TextField id="address" label="Address" variant="outlined" sx={{ mb: 2 }} />
                                <TextField id="zip" label="Zip Code" variant="outlined" sx={{ mb: 2 }} />
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <Button variant="contained" color="primary" onClick={() => updateOrder(order._id)}>
                                        Pay
                                    </Button>
                                    <Link to={`/users/${params.id}/orders`}>
                                        Cancel
                                    </Link>
                                </Stack> */}
                                
                                <PayPalScriptProvider options={{ clientId: "test" }}>
                                    <PayPalButtons style={{ layout: "horizontal" }} />
                                </PayPalScriptProvider>
                                
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}

const updateOrder = async (id) => {
    try {
        const res = await apiService.patch(`/orders/${id}`, {status: "completed", paymentMethod: "card"});
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

export default PaymentPage;