// // react-router components
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "./assets/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
    </ThemeProvider>
  );
}
