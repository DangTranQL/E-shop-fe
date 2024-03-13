import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/NumberFormat";

function OrderAbout({ order }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/orders/${order._id}`)}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="green iguana"
        /> */}
        <CardContent>
          <Stack
            direction="column"
            spacing={1.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography>
                {order._id}
            </Typography>
            <Typography variant="subtitle1">
              {fCurrency(order.price)}
            </Typography>
            <Typography variant="subtitle1">
                {order.status}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OrderAbout;