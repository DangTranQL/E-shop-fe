import { Grid, Stack } from "@mui/material";
import OrderAbout from "./OrderAbout";

function Order({ order }) {
  return (
    <Grid item xs={12} md={4}>
        <Stack spacing={3}>
            <OrderAbout order={order} />
        </Stack>
    </Grid>
  );
}

export default Order;