import React, { useState, useEffect } from "react";

// react-router components
import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKAlert from "../../../assets/components/MKAlert";
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";

// Material Kit 2 React examples
import BalanceCounterCard from "../../../assets/examples/Cards/CounterCards/BalanceCounterCard";
import TransferModal from "./TransferModal";

export default function Overview() {
  const [balance, setBalance] = useState(null);
  const [balanceDecimals, setBalanceDecimals] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transferSuccess, setTransferSuccess] = useState(null);
  const location = useLocation();
  const user_id = new URLSearchParams(location.search).get("user_id");
  const token = new URLSearchParams(location.search).get("token");

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

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
        setBalanceDecimals(
          Math.round(+parseFloat(`${data.balance}`))
            .toFixed(2)
            .toString()
            .split(".")
            .at(1)
        );
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
        <TransferModal setTransferSuccess={setTransferSuccess} />
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
            <BalanceCounterCard
              color={"info"}
              count={Number(balance)}
              suffix={"." + balanceDecimals}
              title={"Balance"}
            />
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
            {/* Add titles */}
            <Grid
              container
              flexDirection="row"
              gap={10}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                  FROM
                </MKTypography>
              </Grid>
              <Grid item>
                <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                  TO
                </MKTypography>
              </Grid>
              <Grid item>
                <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                  DATE
                </MKTypography>
              </Grid>
              <Grid item>
                <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                  AMOUNT
                </MKTypography>
              </Grid>
            </Grid>
            {/* Map over transactions */}
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
                    <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                      {transaction.debitor_username}
                    </MKTypography>
                  </Grid>
                  <Grid item>
                    <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                      {transaction.creditor_username}
                    </MKTypography>
                  </Grid>
                  <Grid item>
                    <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                      {formatDateToDDMMYYYY(transaction.date)}
                    </MKTypography>
                  </Grid>
                  <Grid item>
                    <MKTypography variant="body2" color="light" style={{ fontSize: "14px" }}>
                      ${transaction.amount}
                    </MKTypography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </MKBox>
      </Grid>

      {transferSuccess && <MKAlert color={"success"}>Transfer made successfully!</MKAlert>}
    </Grid>
  );
}
