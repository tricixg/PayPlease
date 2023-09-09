import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKAlert from "../../../assets/components/MKAlert";
import MKBox from "../../../assets/components/MKBox";
import MKTypography from "../../../assets/components/MKTypography";

// Material Kit 2 React examples
import BalanceCounterCard from "../../../assets/examples/Cards/CounterCards/BalanceCounterCard";
import TransferModal from "./TransferModal";

// Session Authentication
import { useAuth } from "context/AuthContext";
import TopupModal from "./TopupModal";
import WithdrawModal from "./WithdrawModal";

export default function Overview() {
  const [balance, setBalance] = useState(null);
  const [balanceDecimals, setBalanceDecimals] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transferSuccess, setTransferSuccess] = useState(null);
  const { user } = useAuth();

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (user) {
      const { user_id, token } = user;
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
    }
  }, [user]);

  return (
    <Grid container alignItems="center" justifyContent="center" rowGap={8} columnGap={4}>
      <Grid
        container
        xs={12}
        style={{ marginTop: "50px", marginLeft: "85px", marginBottom: "-100px" }}
      >
        <TransferModal setTransferSuccess={setTransferSuccess} />
        <TopupModal setTransferSuccess={setTransferSuccess} />
        <WithdrawModal setTransferSuccess={setTransferSuccess} />
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
            <table style={{ color: "white" }}>
              <thead>
                <tr>
                  <th style={{ fontSize: "15px" }}>FROM</th>
                  <th style={{ fontSize: "15px" }}>TO</th>
                  <th style={{ fontSize: "15px" }}>DATE</th>
                  <th style={{ fontSize: "15px" }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: "13px" }}>{transaction.debitor_username}</td>
                    <td style={{ fontSize: "13px" }}>{transaction.creditor_username}</td>
                    <td style={{ fontSize: "13px" }}>{formatDateToDDMMYYYY(transaction.date)}</td>
                    <td style={{ fontSize: "13px" }}>${transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        </MKBox>
      </Grid>

      {transferSuccess && <MKAlert color={"success"}>Transfer made successfully!</MKAlert>}
    </Grid>
  );
}
