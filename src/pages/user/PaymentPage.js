import React, { useEffect, useState, useParams } from 'react';
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import apiService from '../../app/apiService';
import LoadingScreen from '../../components/LoadingScreen';
import { Link } from 'react-router-dom';

function PaymentPage () {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const getOrderItems = async () => {
                setLoading(true);
                try {
                    const res = await apiService.get(`/users/${params.id}/orders`);
                    if (!res.data.order){
                        return (
                            <Alert severity="info">You have no order now</Alert>
                        )
                    }
                    setOrder(res.data.order);
                    setError("");
                } catch (error) {
                    console.log(error);
                    setError(error.message);
                }
                setLoading(false);
            };
            getOrderItems();
        }
    }, [params]);

    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Payment Information
            </Typography>
            <Box sx={{ position: "relative", height: 1 }}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {error ? (
                            <Alert severity="error">{error}</Alert>
                        ) : (
                            <>
                                {order && (
                                    <Box sx={{mb: 2}}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Order ID: {order._id}
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Total: {order.total}
                                        </Typography>
                                        <TextField id="card" label="Card Number" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField id="exp" label="Expiration Date" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField id="cvv" label="CVV" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField id="name" label="Name on Card" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField id="address" label="Address" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField id="zip" label="Zip Code" variant="outlined" sx={{ mb: 2 }} />
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                            <Button variant="contained" color="primary">
                                                Pay
                                            </Button>
                                            <Link to={`/users/${params.id}/orders`}>
                                                Cancel
                                            </Link>
                                        </Stack>
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}

export default PaymentPage;