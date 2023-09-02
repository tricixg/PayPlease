// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../../assets/components/MKBox";
import MKTypography from "../../assets/components/MKTypography";
import MKButton from "../../assets/components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "../../assets/examples/Navbars/DefaultNavbar";
import DefaultFooter from "../../assets/examples/Footers/DefaultFooter";

// Page sections
import Information from "./sections/Information";
// import Team from "./sections/Team";
// import Featuring from "./sections/Featuring";
// import Newsletter from "./sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "../../assets/images/bg-landing.jpg";
import logoStripe from "../../assets/images/logos/logo-stripe.svg";
import logoReact from "../../assets/images/logos/logo-react.svg";
import logoPostgres from "../../assets/images/logos/logo-postgres.svg";

export default function Landing() {
  return (
    <>
      <DefaultNavbar
        brand={"PayPlease"}
        routes={routes}
        action={{
          type: "internal",
          route: "/pages/landing",
          label: "Sign Up",
          color: "white",
        }}
        transparent
        light
      />
      <MKBox
        minHeight="75vh"
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
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Cashless Convinience
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Simplify your financial life with our secure and user-friendly e-wallet app. Unlock
              the power of your money with our innovative e-wallet.
            </MKTypography>
            <MKButton
              color="default"
              sx={{
                color: ({ palette: { dark } }) => dark.main,
              }}
              href="/pages/landing"
            >
              create account
            </MKButton>
            <MKTypography variant="h6" color="white" mt={8} mb={1}>
              Powered By
            </MKTypography>
            <MKBox display="flex" justifyContent="center" alignItems="center">
              <MKTypography component="a" href="#" mr={3}>
                <img src={logoReact} />
              </MKTypography>
              <MKTypography component="a" href="#" mr={3}>
                <img src={logoStripe} />
              </MKTypography>
              <MKTypography component="a" href="#">
                <img src={logoPostgres} />
              </MKTypography>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Information />
        {/* <Team />
        <Featuring />
        <Newsletter /> */}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
