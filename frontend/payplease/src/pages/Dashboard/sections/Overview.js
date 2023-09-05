// react-router components
import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";

// Material Kit 2 React examples
import BalanceCounterCard from "../../../assets/examples/Cards/CounterCards/BalanceCounterCard";
import TransferModal from "./TransferModal";

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
  const location = useLocation();
  const user_id = new URLSearchParams(location.search).get("user_id");
  fetch(`/api/wallet/balance/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ${token}",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch balance");
      }
    })
    .then((data) => {
      console.log("Balance:", data);
      // Handle the fetched data
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors here
    });
  return (
    <Grid container alignItems={"center"} justifyContent={"center"} rowGap={8} columnGap={4}>
      <Grid item xs={12}>
        <TransferModal />
      </Grid>
      {/* Left Card */}
      <Grid item xs={10} lg={5}>
        <MKBox
          component="section"
          variant="gradient"
          bgColor="dark"
          position="relative"
          py={5}
          px={12}
          sx={{ borderRadius: 4 }}
        >
          <BalanceCounterCard color={"info"} count={100430} title={"Balance"} />
        </MKBox>
      </Grid>
      {/* Right Card */}
      <Grid item xs={10} lg={5}>
        <MKBox
          component="section"
          variant="gradient"
          bgColor="dark"
          position="relative"
          py={6}
          px={12}
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
