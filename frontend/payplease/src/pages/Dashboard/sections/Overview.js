// react-router components
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";

// Material Kit 2 React examples
import BalanceCounterCard from "../../../assets/examples/Cards/CounterCards/BalanceCounterCard";
import TransferModal from "./TransferModal";

export default function Overview() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const user_id = new URLSearchParams(location.search).get("user_id");
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    // Get wallet balance
    fetch(`/api/wallet/balance/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        console.log("Balance:", data.balance);
        setBalance(data.balance);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });

    // Fetch transaction history
    fetch(`/api/transaction/history/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch history");
        }
      })
      .then((data) => {
        console.log("History:", data);
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [user_id, token]); // Add user_id and token as dependencies

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
          {balance !== null && (
            <BalanceCounterCard color={"info"} count={balance} title={"Balance"} />
          )}
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
            {transactions.map((transaction, i) => {
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
