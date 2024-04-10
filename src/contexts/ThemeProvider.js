import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const PRIMARY = {
  lighter: "#FFD07F",
  light: "#FDA65D",
  main: "#191970",
  dark: "#E26A2C",
  darker: "#cc571f",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const DARKPRIMARY = {
    lighter: "#FFD07F",
    light: "#FDA65D",
    main: "#000000",
    dark: "#E26A2C",
    darker: "#cc571f",
    contrastText: "#000000",
  };
  const DARKSECONDARY = {
    lighter: "#D6E4FF",
    light: "#84A9FF",
    main: "#B8860B",
    dark: "#1939B7",
    darker: "#091A7A",
    contrastText: "#000000",
  };
  const DARKSUCCESS = {
    lighter: "#E9FCD4",
    light: "#AAF27F",
    main: "#A9A9A9",
    dark: "#229A16",
    darker: "#08660D",
    contrastText: "#000000",
  };

function ThemeProvider({ children, mode }) {
    const [themeMode, setThemeMode] = useState(mode || 'light');

    const lightThemeOptions = {
        palette: {
        primary: PRIMARY,
        secondary: SECONDARY,
        success: SUCCESS,
        mode: 'light',
        },
        shape: { borderRadius: 8 },
    };

    const darkThemeOptions = {
        palette: {
        primary: DARKPRIMARY,
        secondary: DARKSECONDARY,
        success: DARKSUCCESS,
        mode: 'dark',
        },
        shape: { borderRadius: 8 },
    };

    const theme = createTheme(themeMode === 'dark' ? darkThemeOptions : lightThemeOptions);

    const toggleMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 1,
            }}
            >
            {themeMode} mode
            <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
        {children}
        </MUIThemeProvider>
    );
    }

export default ThemeProvider;