import { useEffect } from "react";
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
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils/NumberFormat"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { getProduct } from "../features/product/productSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, isLoading } = useSelector(
    (state) => state.product,
    shallowEqual
  );


  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
    }
  }, []);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          E-Shop
        </Link>
        <Typography color="text.primary">{selectedProduct?.product?.title}</Typography>
      </Breadcrumbs>
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
                            width: 1,
                            height: 1,
                          }}
                          src={selectedProduct?.product?.image}
                          alt="product"
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 2,
                        mb: 1,
                        display: "block",
                        textTransform: "uppercase",
                        color:
                          selectedProduct?.product?.status === "sale"
                            ? "error.main"
                            : "info.main",
                      }}
                    >
                      {selectedProduct?.product?.status}
                    </Typography>
                    <Typography variant="h5" paragraph>
                      {selectedProduct?.product?.title}
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
        <Button variant="contained" color="primary" size="large" onClick={() => apiService.post('/orders/addCart', {productID: selectedProduct.product._id, title: selectedProduct.product.title, quantity: 1, itemPrice: selectedProduct.product.price, image: selectedProduct.product.image})}>Add to Cart</Button>
      </Box>
    </Container>
  );
}

export default DetailPage;