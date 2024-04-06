import React, { useEffect, useState } from 'react';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../features/orderItem/itemSlice';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const params = useParams();

    const id = params.id;

    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const { items, numberOfItems, isLoading } = useSelector(
        (state) => state.item,
        shallowEqual
    );

    useEffect(() => {
        if (userId) {
            dispatch(getAllItems(id, {page, limit}));
        }
    }, [page, dispatch, userId, id]);


    return (
        <Container sx={{ my: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ mb: 2, my: 3 }}>
                    Order Items
                </Typography>
            </Stack>
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
                                    </Box>
                                </Box>
                            ))
                        )}
                        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                            <Pagination count={Math.ceil(numberOfItems/12)} color="primary" onChange={handleChange}/>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};


export default OrderDetails;