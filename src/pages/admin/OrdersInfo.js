import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/order/orderSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Box, Container, Pagination, Stack } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allOrders?.map((order) => (
                                            <TableRow 
                                                key={order._id}
                                                sx={{ backgroundColor: order.status === "completed" ? "lightblue" : "orange" }}
                                            >
                                                <TableCell>{order._id}</TableCell>
                                                <TableCell>{order.status}</TableCell>
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>{order.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Container>
                )}
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Pagination count={Math.ceil(numberOfOrders/12)} color="primary" onChange={handleChange}/>
                </Box>
            </Stack>
        </Container>
        );
}

export default OrdersInfo;