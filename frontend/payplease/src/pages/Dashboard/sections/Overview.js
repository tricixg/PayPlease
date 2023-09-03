// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";
import BalanceCounterCard from "../../../assets/examples/Cards/CounterCards/BalanceCounterCard";

const SAMPLE_TRANSACTIONS = [
  {
    receiver: "Ang Yuze",
    amount: 1258.6,
    date: new Date(Date.parse("03/20/2023")),
  },
  {
    receiver: "Pang Rui Wei",
    amount: 224558.1,
    date: new Date(Date.parse("12/31/2023")),
  },
  {
    receiver: "Branson Ng",
    amount: 200.55,
    date: new Date(Date.parse("01/08/2023")),
  },
  {
    receiver: "Tricia Goh",
    amount: 12.6,
    date: new Date(Date.parse("03/01/2023")),
  },
];

export default function Overview() {
  return (
    <Grid container gap={8} alignItems={"center"} justifyContent={"center"}>
      {/* Right Card */}
      <Grid item xs={12} lg={5}>
        <MKBox
          component="section"
          variant="gradient"
          bgColor="dark"
          position="relative"
          py={6}
          px={{ xs: 2, lg: 0 }}
          sx={{ borderRadius: 4 }}
        >
          <BalanceCounterCard color={"info"} count={100430} title={"Balance"} />
        </MKBox>
      </Grid>
      {/* Left Card */}
      <Grid item xs={12} lg={5}>
        <MKBox
          component="section"
          variant="gradient"
          bgColor="dark"
          position="relative"
          py={6}
          px={{ xs: 12, lg: 8 }}
          sx={{ borderRadius: 4 }}
        >
          <Grid container flexDirection="column">
            <MKTypography variant="h5" color="light">
              Recent Transactions
            </MKTypography>
            {SAMPLE_TRANSACTIONS.map((transaction, i) => {
              return (
                <Grid
                  container
                  flexDirection="row"
                  gap={10}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  key={i}
                >
                  <Grid item>
                    <MKTypography variant="body2" color="light">
                      {transaction.receiver}
                    </MKTypography>
                  </Grid>
                  <Grid item>
                    <MKTypography variant="body2" color="light">
                      {transaction.date.toLocaleDateString()}
                    </MKTypography>
                  </Grid>
                  <Grid item>
                    <MKTypography variant="body2" color="light">
                      ${transaction.amount}
                    </MKTypography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </MKBox>
      </Grid>
    </Grid>
  );
}
