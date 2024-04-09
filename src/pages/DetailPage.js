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
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fCurrency } from "../utils/NumberFormat"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LoadingScreen from "../components/LoadingScreen";
import { getProduct } from "../features/product/productSlice";
import { addCart } from "../features/order/orderSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, isLoading } = useSelector(
    (state) => state.product,
    shallowEqual
  );

  const { numberOfItemsInPending } = useSelector(
    (state) => state.order,
    shallowEqual
  );

  const addCartHandler = async () => {
    try {
      dispatch(addCart({productID: selectedProduct.product._id, title: selectedProduct.product.title, quantity: 1, itemPrice: selectedProduct.product.price, image: selectedProduct.product.image}));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
    }
  }, [dispatch, params.id, numberOfItemsInPending]);

  return (
    <Container sx={{ my: 3 }}>
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