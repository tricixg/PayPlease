import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "./assets/theme";

// Material Kit 2 React routes
import { MainRoutes as routes } from "routes";

// PayPlease pages
import Landing from "pages/Landing";

// Session token
import { AuthContextProvider } from "context/AuthContext";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route, index) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact key={index} path={route.route} element={route.component} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Routes>
          {getRoutes(routes)}
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Navigate to="/landing" />} />
        </Routes>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
