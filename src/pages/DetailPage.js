import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { fCurrency } from "../utils/NumberFormat"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { getProduct } from "../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useAuth from "../hooks/useAuth";
import Badge from '@mui/material/Badge';
import { toast } from "react-toastify";
import { FormProvider } from "../components/form";

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const { selectedProduct, isLoading } = useSelector(
    (state) => state.product,
    shallowEqual
  );

  const { numberOfItemsInPending } = useSelector(
    (state) => state.order,
    shallowEqual
  );

  const [addCart, setAddCart] = useState(numberOfItemsInPending);

  const addCartHandler = async () => {
    setAddCart(addCart + 1);
    try {
      await apiService.post('/orders/addCart', {productID: selectedProduct.product._id, title: selectedProduct.product.title, quantity: 1, itemPrice: selectedProduct.product.price, image: selectedProduct.product.image});
      toast.success("Add to cart successfully");
    } catch (error) {
      toast.error("Add to cart failed");
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
    }
  }, [dispatch, params.id]);

  return (
    <Container sx={{ my: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider>
          <Stack
            spacing={5}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "end" }}
            justifyContent={{ sm: "end" }}
            mb={2}
          >

            <Badge badgeContent={addCart} color="primary">
              <ShoppingCartIcon onClick={() => auth?.user ? navigate(`/user/cart`) : navigate('/login') }/>
            </Badge>
            <ShoppingBagIcon onClick={() => auth?.user ? navigate(`/user/completedOrders`) : navigate('/login') }/>
          </Stack>
        </FormProvider>
      </Stack>
      <Stack direction="row" spacing={10} sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            E-Shop
          </Link>
          <Typography color="text.primary">{selectedProduct?.product?.title}</Typography>
        </Breadcrumbs>
      </Stack>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {selectedProduct?.product && 
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Box p={2}>
                      <Box
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          display: "flex",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: 0.7,
                            height: 0.7,
                          }}
                          src={selectedProduct?.product?.image}
                          alt="product"
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" paragraph>
                      {selectedProduct?.product?.title}
                    </Typography>
                    <Typography variant="h5" paragraph>
                      Stocks: {selectedProduct?.product?.stocks}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 2 }}
                    >
                      <Rating
                        value={selectedProduct?.product?.totalRating}
                        precision={0.1}
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ({selectedProduct?.product?.totalReview} reviews)
                      </Typography>
                    </Stack>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                      {fCurrency(selectedProduct?.product?.price)}
                    </Typography>

                    <Divider sx={{ borderStyle: "dashed" }} />
                    <Box>
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        children={selectedProduct?.product?.description}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>}
          </>
          )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" size="large" disabled={selectedProduct?.product?.stocks === 0} onClick={addCartHandler}>Add to Cart</Button>
      </Box>
    </Container>
  );
}

export default DetailPage;