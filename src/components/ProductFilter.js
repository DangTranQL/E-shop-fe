import { Box, Button, Stack, Typography } from "@mui/material";
import { FRadioGroup } from "./form";
import { ClearAllIcon } from "@mui/icons-material/ClearAll";

export const SORT_BY_CATEGORIES = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "food", label: "Food" },
    { value: "medicine", label: "Medicine" },
    { value: "other", label: "Other" },
];

export const SORT_BY_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "priceDesc", label: "Price: High-Low" },
    { value: "priceAsc", label: "Price: Low-High" },
];

function ProductFilter({ resetFilter }) {
    return (
      <Stack spacing={3} sx={{ p: 3, width: 250 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Categories
          </Typography>
          <FRadioGroup
            name="category"
            options={SORT_BY_CATEGORIES}
            row={false}
          />
        </Stack>
  
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Options
          </Typography>
          <FRadioGroup
            name="options"
            options={SORT_BY_OPTIONS}
            row={false}
          />
        </Stack>
  
        <Box>
          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<ClearAllIcon />}
          >
            Clear All
          </Button>
        </Box>
      </Stack>
    );
  }
  
  export default ProductFilter;