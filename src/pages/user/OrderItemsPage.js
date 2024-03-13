import React, { useEffect } from 'react';
import { Button, Card, CardContent, Container, Grid } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../features/orderItem/itemSlice';
import Items from '../../features/orderItem/Items';
import { useParams } from 'react-router-dom';

function OrderItemsPage() {
    const userId = useAuth().user?._id;
    const dispatch = useDispatch();
    const params = useParams();

    const id = params.id;

    const { items, isLoading } = useSelector(
        (state) => state.item,
        shallowEqual
    );

    useEffect(() => {
        if (userId) {
            dispatch(getAllItems(id));
        }
    }, []);

    return (
        <Container>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <Grid container spacing={3}>
                    <Items id={id}/>
                </Grid>
            )}
        </Container>
    );
};


export default OrderItemsPage;