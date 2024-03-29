import React, { useEffect, useState} from "react";
import AdminProductList from "../../features/product/AdminProductList";
import ProductSearch from "../../features/product/ProductSearch";
import ProductFilter from "../../features/product/ProductFilter";
import { useForm } from "react-hook-form";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { FormProvider } from "../../components/form";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { filterProduct } from "../../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HomeIcon from '@mui/icons-material/Home';

function ProductsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const limit = 12;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const { updatedProduct, filteredProducts, numberOfProducts, isLoading } = useSelector(
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
    }, [page, updatedProduct, numberOfProducts, dispatch, filter.category, filter.option, filter.title]);

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

                <AddBusinessIcon onClick={() => navigate("/admin/products/create")} />

                <HomeIcon onClick={() => navigate("/admin")}/>
                
              </Stack>
            </FormProvider>
            <Box sx={{ position: "relative", height: 1 }}>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  {filteredProducts && <AdminProductList products={filteredProducts} />}
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

export default ProductsPage;