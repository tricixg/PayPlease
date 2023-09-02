const express = require("express");
const session = require('express-session');
const userRouter = require('./routes/userRoutes');
const walletRouter = require('./routes/walletRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const authenticate = require('./middleware/authenticate');

const app = express();

app.set('view engine', 'ejs');
app.listen(5009, () => {
    console.log("listening to port 5009")
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

app.use(session({
    secret: 'eightkeh',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Set up session before routes
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use("/api/user", userRouter);

// ----- Protected Routes -----
app.use(authenticate)
app.use("/api/transaction", transactionRouter);
app.use("/api/wallet", walletRouter);


// Connection to database
const { Pool, Client } = require('pg');
const db = new Pool({
    user: 'eightkeh',
    host: 'dpg-cjnnfevjbvhs73fblg6g-a.singapore-postgres.render.com',
    database: 'eightkeh',
    password: 'jaiwAfX5DAbpzBz6FMuN0BsyS1RG62r2',
    port: '5432',
    ssl: {
        rejectUnauthorized: false, 
    },
})

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Connected to the database at:', res.rows[0].now);
    }
});

db.query('SELECT * FROM wallet.users', (err, res) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Connected to the database at:', res.rows);
    }
});

module.exports = db;