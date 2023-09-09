import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/theme";
import { MainRoutes as routes } from "routes";
import Landing from "pages/Landing";
import { AuthContextProvider } from "context/AuthContext";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51NkrWXA2kau6fLsqzRhwcHc4TjtrI6fRUfWnJvOtV07BmB1eO95D2xvsyKOTysLMKFRTUxTy3qAJalaLUaj2sLu600tvv5LbWI";
const stripePromise = loadStripe(PUBLIC_KEY);

export default function App() {
  const { pathname } = useLocation();

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
        <Elements stripe={stripePromise}>
          <Routes>
            {getRoutes(routes)}
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Navigate to="/landing" />} />
          </Routes>
        </Elements>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
