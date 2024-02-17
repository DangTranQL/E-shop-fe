// show user's order items
import React, { useEffect, useState, useParams } from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import apiService from '../../app/apiService';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartPage() {
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState(null);
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
            setOrderItems(res.data.orderItems);
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
                Order Items
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
                                {orderItems && (
                                    orderItems.map((item, index) => (
                                        <Box key={index}>
                                            <Box component="img"
                                                sx={{
                                                    width: 1,
                                                    height: 1,
                                                }}
                                                src={item.image}
                                                alt="orderItem"
                                            />
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography variant="body1">{item.quantity}</Typography>
                                            <Typography variant="body1">{item.priceEach}</Typography>

                                            <Box>
                                                <AddIcon onClick={() => apiService.put(`/users/${params.id}/orders`, {orderID: order._id, productID: item._id, title: item.title, quantity: 1, itemPrice: item.price, image: item.image})}/>
                                                <RemoveIcon onClick={() => apiService.put(`/users/${params.id}/orders`, {orderID: order._id, productID: item._id, title: item.title, quantity: -1, itemPrice: item.price, image: item.image})}/>
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};


export default CartPage;