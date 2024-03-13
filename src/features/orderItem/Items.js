import { Stack } from "@mui/material";
import ItemsAll from "./ItemsAll";

function Items({ id }) {
  return (
    <Stack spacing={3}>
            <ItemsAll id={id} />
    </Stack>
  );
}

export default Items;