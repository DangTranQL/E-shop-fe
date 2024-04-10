import React, { useEffect, useState} from "react";
import ProductList from "../features/product/ProductList";
import ProductSearch from "../features/product/ProductSearch";
import ProductFilter from "../features/product/ProductFilter";
import { useForm } from "react-hook-form";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import { filterProduct } from "../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getPendingOrder } from "../features/order/orderSlice";

function HomePage() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 12;

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
        dispatch(filterProduct({page, limit, ...filter}));
        dispatch(getPendingOrder());
        // eslint-disable-next-line
    }, [page, dispatch, filter.category, filter.option, filter.title]);

    return (
        <Container sx={{ display: { xs: "block", sm: "flex" }, minHeight: "100vh", mt: 3 }}>
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

              </Stack>
            </FormProvider>
            <Box sx={{ position: "relative", height: 1}}>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  {filteredProducts?.count > 0 ? (<ProductList products={filteredProducts} />) : (<h2>No products found</h2>)}
                </>
              )}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <Pagination count={Math.ceil(numberOfProducts/12)} color="secondary" onChange={handleChange}/>
            </Box>
          </Stack>
        </Container>
      );
};

export default HomePage;