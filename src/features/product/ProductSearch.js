import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "../../components/form";

function ProductSearch() {
  return (
    <FTextField
      name="title"
      sx={{ width: { xs: '100%', sm: 700 } }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ProductSearch;