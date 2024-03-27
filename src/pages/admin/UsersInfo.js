import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/user/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { FormProvider } from "react-hook-form";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

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
    }, [page]);

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
                    <Stack
                        direction={{ xs: "column" }}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                    >
                        {allUsers?.map((user) => (
                            <Stack 
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 2, backgroundColor: user.role === "buyer" ? "lightblue" : "orange" }} spacing={10}>
                                <Typography>Username: {user.username}</Typography>
                                <Typography>Email: {user.email}</Typography>
                                <Typography>Role: {user.role}</Typography>
                                <Typography>Address: {user.address}</Typography>
                                <Typography>Phone: {user.phone}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                )}
                </Box>
                <Pagination count={Math.ceil(numberOfUsers/12)} color="primary" onChange={handleChange}/>
            </Stack>
        </Container>
        );
}

export default UsersInfo;