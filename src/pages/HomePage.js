import React, { useEffect, useState} from "react";
import ProductList from "../features/product/ProductList";
import ProductSearch from "../features/product/ProductSearch";
import ProductFilter from "../features/product/ProductFilter";
import { useForm } from "react-hook-form";
import { Box, Container, Menu, MenuItem, Pagination, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from "react-router-dom";
import { filterProduct } from "../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function HomePage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 12;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
      if (auth?.user) {
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
        reset();
      }
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    const { filteredProducts, numberOfProducts, isLoading } = useSelector(
        (state) => state.product,
        shallowEqual
    );

    const defaultFilter = {
        title: null,
        category: null,
        option: null,
    };

    const methods = useForm({
        defaultValues: defaultFilter,
    });

    const { watch, reset } = methods;
    const filter = watch();

    useEffect(() => {
        dispatch(filterProduct({page, limit, ...filter.category, ...filter.option, ...filter.title}));
    }, [page, dispatch, filter.category, filter.option, filter.title]);

    return (
        <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
          <Stack>
            <FormProvider methods={methods}>
              <ProductFilter resetFilter={reset} />
            </FormProvider>
          </Stack>
          <Stack sx={{ flexGrow: 1 }}>
            <FormProvider methods={methods}>
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                mb={2}
              >
                <ProductSearch /> 
                
                <ShoppingCartIcon onClick={() => auth?.user ? navigate(`/user/cart`) : navigate('/login') }/>
                <ShoppingBagIcon onClick={() => auth?.user ? navigate(`/user/completedOrders`) : navigate('/login') }/>
                <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  {auth?.user ? <MenuItem onClick={Logout}>Logout</MenuItem> : null}
                </Menu>

              </Stack>
            </FormProvider>
            <Box sx={{ position: "relative", height: 1 }}>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  {filteredProducts && <ProductList products={filteredProducts} />}
                </>
              )}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Pagination count={Math.ceil(numberOfProducts/12)} color="primary" onChange={handleChange}/>
            </Box>
          </Stack>
        </Container>
      );
};

export default HomePage;