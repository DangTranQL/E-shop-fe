import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/user/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Box, Container, Pagination, Stack } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function UsersInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const {allUsers, numberOfUsers, isLoading} = useSelector(
        (state) => state.user,
        shallowEqual
    );

    useEffect(() => {
        console.log("filter", page, limit);
        dispatch(getUsers({page, limit}));
    }, [page, dispatch]);

    return (
        <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
            <Stack sx={{ flexGrow: 1 }}>
                <Stack
                    spacing={2}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                    justifyContent="right"
                    mb={2}
                >

                    <HomeIcon onClick={() => navigate("/admin")}/>
                </Stack>
                <Box sx={{ position: "relative", height: 1 }}>
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers?.map((user) => (
                                    <TableRow 
                                        key={user.username}
                                        sx={{ backgroundColor: user.role === "buyer" ? "lightblue" : "orange" }}
                                    >
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Pagination count={Math.ceil(numberOfUsers/12)} color="primary" onChange={handleChange}/>
                </Box>
            </Stack>
        </Container>
        );
}

export default UsersInfo;