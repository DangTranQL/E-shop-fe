import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/NumberFormat";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/products/${product._id}`)} sx={{ width: 200, height: 200 }}>
      <CardActionArea>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={product.image} alt={product.title} height="120"/>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {product.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="subtitle1">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;