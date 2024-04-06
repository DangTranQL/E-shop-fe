import React from "react";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

function MainFooter() {
  return (
    <Box sx={{ backgroundColor: "gray" }}>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.coderschool.vn">
          DangTran
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default MainFooter;