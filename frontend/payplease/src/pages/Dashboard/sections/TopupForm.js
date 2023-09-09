import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "context/AuthContext";
import PropTypes from "prop-types"; // Import PropTypes

const PUBLIC_KEY =
  "pk_test_51NkrWXA2kau6fLsqzRhwcHc4TjtrI6fRUfWnJvOtV07BmB1eO95D2xvsyKOTysLMKFRTUxTy3qAJalaLUaj2sLu600tvv5LbWI";

TopupForm.propTypes = {
  onTopupSuccess: PropTypes.func.isRequired, // Add prop validation
};

export default function TopupForm({ onTopupSuccess }) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0); // State for payment amount
  const [message, setMessage] = useState(""); // State for displaying messages

  const handlePayment = async (token) => {
    try {
      const { user_id, token: auth_token } = user;
      fetch("/api/transaction/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({
          user_id: user_id,
          amount: amount,
          stripe_token: token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error("Top-up failed:", response.error);
            setMessage(`Top-up failed: Amount must be > $5, & a whole number`); // Set error message
            throw new Error("Top-up failed");
          }
        })
        .then((data) => {
          console.log(data);
          onTopupSuccess(true); // Trigger the callback
        })
        .catch((error) => {
          console.error("Error topping up:", error);
          setMessage("Top-up failed. Please try again."); // Set generic error message
        });
    } catch (error) {
      console.log("Error topping up: ", error);
      setMessage("Top-up failed. Please try again."); // Set generic error message
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          type="number"
          label="Amount to Top Up"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <StripeCheckout
            stripeKey={PUBLIC_KEY}
            token={handlePayment}
            name="Top Up"
            amount={amount * 100}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                marginLeft: "10px",
                marginTop: "5px",
              }}
            >
              Top Up
            </Button>
          </StripeCheckout>
          {message && (
            <p
              style={{
                marginLeft: "10px",
                fontSize: "12px",
                color: message.includes("failed") ? "red" : "green",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </header>
    </div>
  );
}
