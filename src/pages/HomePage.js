import React, { useEffect} from "react";
import ProductList from "../features/product/ProductList";
import ProductSearch from "../features/product/ProductSearch";
import ProductFilter from "../features/product/ProductFilter";
import { useForm } from "react-hook-form";
import { Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { filterProduct } from "../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function ProductsPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { filteredProducts, isLoading } = useSelector(
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

    const { watch, reset} = methods;
    const filter = watch();

    useEffect(() => {
        dispatch(filterProduct(filter));
    }, [filter.option, filter.category, filter.title]);

    console.log("filteredProducts", filteredProducts);

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
                
                <ShoppingCartIcon onClick={() => auth?.user ? navigate(`/user/orders`) : navigate('/login') }/>
                <AccountCircleIcon onClick={() => auth?.user ? navigate(`/user/profile`) : navigate('/login') }/>
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
          </Stack>
        </Container>
      );
};

export default ProductsPage;