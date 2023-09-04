const express = require("express");
const userRouter = require('./routes/userRoutes');
const walletRouter = require('./routes/walletRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.listen(3000, () => {
    console.log("listening to port 3000")
});

// middleware to log to console
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}); 

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use("/api/user", userRouter);

// ----- Protected Routes -----
app.use(authenticate)
app.use("/api/transaction", transactionRouter);
app.use("/api/wallet", walletRouter);
