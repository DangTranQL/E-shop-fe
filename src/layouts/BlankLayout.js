import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "fixed",
  overflow: "hidden", 
  zIndex: -1, 
}));

function BlankLayout() {
  return (
    <Stack maxWidth="100vw" minHeight="100vh" justifyContent="center" alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
      <HeaderStyle>
        <Logo sx={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(10px)", opacity: 0.3 }} />
      </HeaderStyle>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;