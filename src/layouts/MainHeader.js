import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { Badge, Menu, MenuItem, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect } from "react";
import { getPendingOrder } from "../features/order/orderSlice";
import HomeIcon from '@mui/icons-material/Home';

function MainHeader() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (auth.user) {
      navigate(`/user/profile`);
    } else {
      navigate(`/login`);
    }
  };

  const Logout = async () => {
    const from = "/" ;
    try {
      await auth.logout(() => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { numberOfItemsInPending } = useSelector(
      (state) => state.order,
      shallowEqual
  );

  useEffect(() => {
    dispatch(getPendingOrder());
  }, [dispatch, numberOfItemsInPending, navigate]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ mr: { xs: 0, sm: 2 } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo disabledLink={auth?.user?.role === 'admin'}/>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            E-shop
          </Typography>

          <Stack sx={{ flexGrow: 1 }}>
            <FormProvider>
              <Stack
                spacing={2}
                display="flex"
                direction="row"
                justifyContent="flex-end"
              >
                {auth?.user?.role === 'admin' ? (
                  <HomeIcon onClick={() => navigate("/admin")}/>
                ) : (
                <>
                  <Badge badgeContent={numberOfItemsInPending} color="secondary">
                    <ShoppingCartIcon onClick={() => auth?.user ? navigate(`/user/cart`) : navigate('/login') }/>
                  </Badge>
                  <ShoppingBagIcon onClick={() => auth?.user ? navigate(`/user/completedOrders`) : navigate('/login') }/>
                </>)}
                <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}> {auth?.user ? (<>Profile</>) : (<>Login</>)}</MenuItem>
                  {auth?.user ? <MenuItem onClick={Logout}>Logout</MenuItem> : null}
                </Menu>
              </Stack>
            </FormProvider>
          </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;