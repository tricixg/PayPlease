// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AppsRounded, PaymentsRounded, PublicRounded, ThreePRounded } from "@mui/icons-material";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";

// Material Kit 2 React examples
import DefaultInfoCard from "../../../assets/examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "../../../assets/examples/Cards/BlogCards/CenteredBlogCard";

// Images
import digitalWallet from "../../../assets/images/img-digital-wallet.jpg";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon={<PublicRounded color="info" />}
                    title="Seamless Transactions"
                    description="Effortlessly transfer funds between accounts with our intuitive e-wallet system, ensuring swift and secure transactions."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon={<PaymentsRounded color="info" />}
                    title="Single-Channel integration"
                    description="Streamline your financial payments through our direct link with Stripe, enabling fast pay-ins and payouts."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<AppsRounded color="info" />}
                    title="Fortified Security Measures"
                    description="With robust data consistency and advanced security protocols, your assets are shielded against common vulnerabilities, ensuring peace of mind."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<ThreePRounded color="info" />}
                    title="Transparent Ledger System"
                    description="Experience full visibility into your financial transactions with a PostgreSQL-powered ledger, providing a reliable record of every account movement."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image={digitalWallet}
              title="Get Started Now"
              description="Embark on a seamless financial journey with our user-friendly e-wallet. Sign up today and revolutionize how you manage your money."
              action={{
                type: "internal",
                route: "/authentication/signup",
                color: "info",
                label: "Sign Up",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
