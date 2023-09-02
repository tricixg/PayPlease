import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
    productbY: "facebook"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:2000/payment`, {
      method: "POST", 
      headers, 
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        stripeKey="pk_test_51NkrWXA2kau6fLsqzRhwcHc4TjtrI6fRUfWnJvOtV07BmB1eO95D2xvsyKOTysLMKFRTUxTy3qAJalaLUaj2sLu600tvv5LbWI"
        token={makePayment}
        name="Buy React" 
        amount={product.price * 100}>
        <button className="btn-large blue">Buy react is just ${product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
