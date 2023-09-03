const express = require("express");
const userRouter = require('./routes/userRoutes');
const walletRouter = require('./routes/walletRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const authenticate = require('./middleware/authenticate');
const cors = require("cors");
const stripe = require("stripe")("sk_test_51NkrWXA2kau6fLsqOyJvGAXseIIyHNbf0ejoks9cs9bI7FWVjzqwyw9boj67ilx8FQfG9nzfWnuhPrZvmW8bJsD400a8z6IqeR");
const { v4: uuidv4 } = require('uuid');

const app = express();


app.listen(2000, () => {
    console.log("listening to port 2000")
});

// middleware to log to console
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}); 

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

// ----- Protected Routes -----
app.use(authenticate)

app.get("/", (req, res) => {
    res.setEncoding("IT WORKS");
});

app.post("/payment", (req, res) => {
    const {product, token} = req.body;
    console.log("PRODUCT", product)
    console.log("PRICE", product.price)
    const idempontency_key = uuidv4();

    return stripe.customers.create({
        email:token.email, 
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id, 
            receipt_email: token.email,
            description: "top up to account",
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }

        }, {
            idempotencyKey: idempontency_key
        })
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
});


app.use("/api/transaction", transactionRouter);
app.use("/api/wallet", walletRouter);


