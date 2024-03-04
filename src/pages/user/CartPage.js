// show user's order items
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import apiService from '../../app/apiService';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useAuth from '../../hooks/useAuth';

function CartPage() {
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userID = useAuth().user?._id;

    useEffect(() => {
        if (userID) {
        const getOrderItems = async () => {
            setLoading(true);
            try {
            const res = await apiService.get(`/orders/user/${userID}`);
            console.log("ORDER", res);
            // if (!res.data.order){
            //     return (
            //         <Alert severity="info">You have no order now</Alert>
            //     )
            // }
            setOrder(res.data.data.order);
            setOrderItems(res.data.data.orderItems);
            setError("");
            } catch (error) {
            console.log(error);
            setError(error.message);
            }
            setLoading(false);
        };
        getOrderItems();
        }
    }, [userID]);

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
                                        console.log("ITEM", item),
                                        <Box key={index}>
                                            <Box component="img"
                                                sx={{
                                                    width: 0.5,
                                                    height: 0.5,
                                                }}
                                                src={item.image}
                                                alt="orderItem"
                                            />
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography variant="body1">{item.quantity}</Typography>
                                            <Typography variant="body1">{item.priceEach}</Typography>

                                            <Box>
                                                <Button onClick={() => updateItem(order._id, item._id, item.quantity, 1)}>+</Button>
                                                <Button onClick={() => updateItem(order._id, item._id, item.quantity -1)}>-</Button>
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

const updateItem = async (orderId, itemid, itemQuantity, change) => {
    try{
        if (itemQuantity + change <= 0) {
            await apiService.delete(`/orders/${orderId}/item/${itemid}`);
            return;
        }
        const res = await apiService.patch(`/orders/${orderId}/item/${itemid}`, { change });
        console.log("UPDATEITEM", res);
    } catch (error) {
        console.log(error);
    }
}


export default CartPage;