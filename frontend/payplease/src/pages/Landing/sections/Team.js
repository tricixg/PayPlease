// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "../../../assets/examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "../../../assets/images/team/team-1.jpg";
import team2 from "../../../assets/images/team/team-2.jpg";
import team3 from "../../../assets/images/team/team-3.jpg";
import team4 from "../../../assets/images/team/team-4.jpg";
import team5 from "../../../assets/images/team/team-5.jpg";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Meet The Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Catalyzing innovation, one digital transaction at a time, meet the minds behind the
              magic.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Ang Yuze"
                position={{ color: "info", label: "Lead Developer" }}
                description="National University of Singapore, Computer Science, Year 3"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Branson Lee"
                position={{ color: "info", label: "Backend Developer" }}
                description="National University of Singapore, Computer Science, Year 3"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="Pang Rui Wei"
                position={{ color: "info", label: "Backend Developer &  DevOps Engineer" }}
                description="National University of Singapore, Computer Science, Year 3"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Tan Yan-Hao Joshua"
                position={{ color: "info", label: "Frontend Developer & UI Designer" }}
                description="National University of Singapore, Computer Science, Year 3"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team5}
                name="Tricia Goh"
                position={{ color: "info", label: "External APIs & UI Designer" }}
                description="National University of Singapore, Computer Science, Year 3"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
