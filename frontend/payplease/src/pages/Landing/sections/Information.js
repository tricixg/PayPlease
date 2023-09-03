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
                    title="Fully integrated"
                    description="We get insulted by others, lose trust for those We get back freezes"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon={<PaymentsRounded color="info" />}
                    title="Payments functionality"
                    description="We get insulted by others, lose trust for those We get back freezes"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<AppsRounded color="info" />}
                    title="Prebuilt components"
                    description="We get insulted by others, lose trust for those We get back freezes"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<ThreePRounded color="info" />}
                    title="Improved platform"
                    description="We get insulted by others, lose trust for those We get back freezes"
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image={digitalWallet}
              title="Get insights on Search"
              description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
