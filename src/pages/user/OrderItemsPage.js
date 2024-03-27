import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Pagination, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../features/orderItem/itemSlice';
import { useParams } from 'react-router-dom';
import apiService from '../../app/apiService';

function OrderItemsPage() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const params = useParams();

    const id = params.id;

    const [page, setPage] = useState(1);
    const limit = 12;
    const [numChange, setNumChange] = useState(0);

    const buttonStyle = {backgroundColor: 'orange', color: 'white', fontSize: '1.5em', weight: 600};

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

    const handleChange = (event, value) => {
        setPage(value);
    };

    const { items, numberOfItems, order, isLoading } = useSelector(
        (state) => state.item,
        shallowEqual
    );

    useEffect(() => {
        if (userId) {
            dispatch(getAllItems(id, {page, limit}));
        }
    }, [page, numChange]);


    return (
        <Container sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, my: 3 }}>
                Order Items
            </Typography>
            <Box sx={{ position: "relative", height: 1 }}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {items && (
                            items.map((item, index) => (
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
                                        <Typography variant="body1">Quantity: {item.quantity}</Typography>

                                        {order.status === "pending" && <Box>
                                            <Button style={buttonStyle} onClick={() => updateItem(order._id, item._id, item.quantity, 1)}>+</Button>
                                            <Button style={buttonStyle} onClick={() => updateItem(order._id, item._id, item.quantity, -1)}>-</Button>
                                        </Box>}
                                    </Box>
                                </Box>
                            ))
                        )}
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Pagination count={Math.ceil(numberOfItems/12)} color="primary" onChange={handleChange}/>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};


export default OrderItemsPage;