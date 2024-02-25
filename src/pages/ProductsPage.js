import React, { useState, useEffect} from "react";
import apiService from "../app/apiService";
import ProductList from "../features/product/ProductList";
import ProductSearch from "../features/product/ProductSearch";
import ProductFilter from "../features/product/ProductFilter";
import ProductSort from "../features/product/ProductSort";
import { useForm } from "react-hook-form";
import  orderBy from "lodash";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

function ProductsPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const defaultFilter = {
        category: "All",
        sortBy: "featured",
        searchQuery: "",
    };

    const methods = useForm({
        defaultValues: defaultFilter,
    });

    const { watch, reset} = methods;
    const filter = watch();
    const filterProducts = applyFilter(products, filter);

    useEffect(() => {
        console.log("UseEffect");
        const getProducts = async () => {
            setLoading(true);
            try {
                const res = await apiService.get("/products");
                console.log("PRODUCTPAGE", res);
                setProducts(res.data.data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        }
        getProducts();
    }, []);

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
                <ProductSort />
                
                <ShoppingCartIcon onClick={() => auth?.user ? navigate(`/user/orders`) : navigate('/login') }/>
                <AccountCircleIcon onClick={() => auth?.user ? navigate(`/user/profile`) : navigate('/login') }/>
              </Stack>
            </FormProvider>
            <Box sx={{ position: "relative", height: 1 }}>
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {error ? (
                    <Alert severity="error">{error}</Alert>
                  ) : (
                    <ProductList products={filterProducts} />
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Container>
      );
};

function applyFilter (products, filter) {
    const { sortBy } = filter;
    let filteredProducts = products;

    // Sort by
    if (sortBy === "featured") {
        filteredProducts = orderBy(products, ["sold"], ["desc"]);
    }
    if (sortBy === "newest") {
        filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
    }
    if (sortBy === "priceDesc") {
        filteredProducts = orderBy(products, ["price"], ["desc"]);
    }
    if (sortBy === "priceAsc") {
        filteredProducts = orderBy(products, ["price"], ["asc"]);
    }

    return filteredProducts;
}

export default ProductsPage;