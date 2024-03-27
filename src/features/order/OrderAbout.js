import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/NumberFormat";

function OrderAbout({ order }) {
  const navigate = useNavigate();
  const cardStyle = order.status === 'pending' ? {backgroundColor: '#FFE4B5'} : {backgroundColor: '#66CDAA'};

  return (
    <Card style={cardStyle} onClick={() => navigate(`/orders/${order._id}`)}>
      <CardActionArea>
        <CardContent>
          <Stack
            direction="column"
            spacing={1.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography>
                Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">
              {fCurrency(order.price)}
            </Typography>
            <Typography variant="subtitle1">
              ADDRESS: {order.address}
            </Typography>
            <Typography variant="subtitle1">
                STATUS: {order.status}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OrderAbout;