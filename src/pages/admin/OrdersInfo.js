import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/order/orderSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

function OrdersInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const {allOrders, numberOfOrders, isLoading} = useSelector(
        (state) => state.order,
        shallowEqual
    );

    useEffect(() => {
        dispatch(getAllOrders({page, limit}));
    }, [page, dispatch]);

    return (
        <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
            <Stack sx={{ flexGrow: 1 }}>
                <Box sx={{ position: "relative", height: 1 }}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
                        <Stack sx={{ flexGrow: 1 }}>
                            <Stack display="flex" alignItems="flex-end">
                                <HomeIcon onClick={() => navigate("/admin")}/>
                            </Stack>
                            <Stack
                                direction={{ xs: "column" }}
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 2 }}
                            >
                                {allOrders?.map((order) => (
                                    <Stack 
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mb: 2, backgroundColor: order.status === "completed" ? "lightblue" : "yellow" }} spacing={10} mt={5}>
                                        <Typography>ID: {order._id}</Typography>
                                        <Typography>Status: {order.status}</Typography>
                                        <Typography>Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                        <Typography>Price: {order.price}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Container>
                )}
                </Box>
                <Pagination count={Math.ceil(numberOfOrders/12)} color="primary" onChange={handleChange}/>
            </Stack>
        </Container>
        );
}

export default OrdersInfo;