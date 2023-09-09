import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "context/AuthContext";

const PUBLIC_KEY =
  "pk_test_51NkrWXA2kau6fLsqzRhwcHc4TjtrI6fRUfWnJvOtV07BmB1eO95D2xvsyKOTysLMKFRTUxTy3qAJalaLUaj2sLu600tvv5LbWI";

export default function TopupForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0); // State for payment amount

  console.log(user);
  const handlePayment = async (token) => {
    try {
      const { user_id, token: auth_token } = user;
      return fetch("/api/transaction/topup", {
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
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          console.log(data);
        })
        .catch((error) => {
          console.error("Error topping up:", error);
        });
    } catch (error) {
      console.log(error);
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
        <StripeCheckout
          stripeKey={PUBLIC_KEY}
          token={handlePayment}
          name="Top Up"
          amount={amount * 100}
        >
          <Button variant="contained" color="primary">
            Top Up
          </Button>
        </StripeCheckout>
      </header>
    </div>
  );
}
