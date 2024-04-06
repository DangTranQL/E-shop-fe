import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import { useParams } from 'react-router-dom/dist';
import useAuth from '../../hooks/useAuth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getOrder, updateOrder } from '../../features/order/orderSlice';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function PaymentPage () {
    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        if (Object.values(data).every(x => (x !== null && x !== ''))) {
          dispatch(updateOrder({id: selectedOrder.order._id, status: "completed", address: data.address, paymentMethod: "Card"}));
          navigate('/user/completedOrders');
        } else {
          console.log('All fields must be filled');
        }
      }

    const validateCard = (card) => {
        if (validator.isCreditCard(card)) { 
            setErrorMessage('Valid CreditCard Number') 
        } else { 
            setErrorMessage('Enter valid CreditCard Number!') 
        } 
    }

    const { selectedOrder, isLoading } = useSelector(
        (state) => state.order,
        shallowEqual
    );

    useEffect(() => {
        if (auth.user?._id) {
            dispatch(getOrder(params.id));
        }
    }, [dispatch, params.id, auth.user?._id]);


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
                                    Order ID: {selectedOrder.order._id}
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Total: ${selectedOrder.order.price}
                                </Typography>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField {...register("card", { required: true })} id="card" label="Card Number" variant="outlined" sx={{ mb: 2 }} onChange={(e) => validateCard(e.target.value)}/> <br/>
                                        <span style={{ 
                                        fontWeight: 'bold', 
                                        color: 'red', 
                                        }}>{errorMessage}</span>  <br/>
                                        {errors.card && <span>This field is required</span>}
                                    <TextField {...register("exp", { required: true })} id="exp" label="Expiration Date" variant="outlined" sx={{ mb: 2 }} />
                                        {errors.exp && <span>This field is required</span>}
                                    <TextField {...register("cvv", { required: true })} id="cvv" label="CVV" variant="outlined" sx={{ mb: 2 }} /> <br/>
                                        {errors.cvv && <span>This field is required</span>}
                                    <TextField {...register("name", { required: true })} id="name" label="Name on Card" variant="outlined" sx={{ mb: 2 }} />
                                        {errors.name && <span>This field is required</span>}
                                    <TextField {...register("address", { required: true })} id="address" label="Address" variant="outlined" sx={{ mb: 2 }} />
                                        {errors.address && <span>This field is required</span>}
                                    <TextField {...register("zip", { required: true })} id="zip" label="Zip Code" variant="outlined" sx={{ mb: 2 }} />
                                        {errors.zip && <span>This field is required</span>} <br/>
                                    <Button variant="contained" color="primary" type="submit">
                                        Pay
                                    </Button>
                                </form>
                                
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}

export default PaymentPage;