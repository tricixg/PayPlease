// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKButton from "../../../assets/components/MKButton";

export default function Sidebar() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      mr={2}
      py={6}
      px={{ xs: 2, lg: 0 }}
      sx={{ borderRadius: 4 }}
    >
      <Grid container gap={2} flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item>
          <MKButton>hello</MKButton>
        </Grid>
        <Grid item>
          <MKButton>hello</MKButton>
        </Grid>
        <Grid item>
          <MKButton>hello</MKButton>
        </Grid>
        <Grid item>
          <MKButton>hello</MKButton>
        </Grid>
      </Grid>
    </MKBox>
  );
}
