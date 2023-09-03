// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../assets/components/MKBox";
// import MKTypography from "../../assets/components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "../../assets/examples/Navbars/DefaultNavbar";
import SimpleFooter from "../../assets/examples/Footers/SimpleFooter";

// Page sections
import Overview from "./sections/Overview";

// Routes
import { WalletRoutes as routes } from "routes";

// Images
import bgImage from "../../assets/images/bg-landing.jpg";

export default function Landing() {
  return (
    <>
      <DefaultNavbar
        brand={"PayPlease"}
        routes={routes}
        action={{
          type: "internal",
          route: "/authentication/signin",
          label: "Pay",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          sx={{ padding: 2, mx: "auto", textAlign: "center" }}
        >
          <Grid item xs={12}>
            <Overview />
          </Grid>
        </Grid>
        <MKBox pt={6} px={1} mt={6} mb={4}>
          <SimpleFooter company={{ href: "/", name: "eigthkeh" }} light />
        </MKBox>
      </MKBox>
    </>
  );
}
