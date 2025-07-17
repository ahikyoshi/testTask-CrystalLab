import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2c2c2c", // графит
    },
    secondary: {
      main: "#3c3c3c", // чуть светлее
    },
    background: {
      default: "#121212", // почти чёрный фон
      paper: "#1e1e1e",   // для карточек/панелей
    },
    text: {
      primary: "#e0e0e0", // светлый текст
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`, // можешь заменить на кастомный
    fontSize: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});
