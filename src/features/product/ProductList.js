import { Box, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <Grid container spacing={3} mt={1}>
      {products?.products?.map((product, index) => (
        <Grid key={product._id} item xs={9} md={4} lg={3}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <ProductCard product={product}/>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;