import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/NumberFormat";

function ProductCard({ product }) {
  const navigate = useNavigate();
  console.log("PRODUCT", product)
  return (
    <Card onClick={() => navigate(`/product/${product._id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="green iguana"
        />
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
            {product.price && (
              <Typography
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                {fCurrency(product.price)}
              </Typography>
            )}
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