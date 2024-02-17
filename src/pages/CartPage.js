// show user's order items

import React, { useEffect, useState, useParams } from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import LoadingScreen from '../components/LoadingScreen';
import apiService from '../app/apiService';

function CartPage() {
    const [orderItems, setOrderItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();

    useEffect(() => {
        if (params.id) {
        const getOrderItems = async () => {
            setLoading(true);
            try {
            const res = await apiService.get(`/${params.id}/orders`);
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
                                                alt="product"
                                            />
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography variant="body1">{item.description}</Typography>
                                            <Typography variant="body1">{item.category}</Typography>
                                            <Typography variant="body1">{item.price}</Typography>
                                            <Typography variant="body1">{item.stocks}</Typography>
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
}