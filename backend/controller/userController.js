const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../db');

const loginUser = (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM wallet.users WHERE email = $1', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while checking email' });
        }

        if (results.rows.length == 0) {
            return res.status(400).json({ message: 'Email or password is wrong.' });
        }

        console.log(results.rows[0]);
        const user = results.rows[0]; 

        const hashedPassword = user.hashed_pw;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            // add create session token and attach to response
            res.status(200).json({ message: "Login successful"})
        } else {
            res.status(400).json({ message: "Invalid Password" })
        }
    });
};

const signupUser = (req, res) => {

    // Parameters for users table
    const user_id = uuidv4();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const accout_type = 'User';

    // Parameters for wallets table
    const wallet_id = uuidv4();
    const balance = 0;

    // Check for errors in the user input
    db.query('SELECT email FROM wallet.users WHERE email = $1', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while checking email' });
        }

        if (results.rows.length > 0) {
            return res.status(400).json({ message: 'That email is already in use' });
        }

        // Hashing password
        let hashedPassword = await bcrypt.hash(password, 8);

        // If correct user input, different email, password match etc, insert new user into database
        db.query('INSERT INTO wallet.users (user_id, username, email, hashed_pw, phone_number, account_type) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, username, email, hashedPassword, phone, accout_type], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'An error occurred while inserting user' });
            } else {
                console.log(results);
                // Create wallet for new user into database
                db.query('INSERT INTO wallet.wallets (wallet_id, user_id, balance) VALUES ($1, $2, $3)', [wallet_id, user_id, balance], (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'An error occurred while creating wallet' });
                    }
                })
                return res.status(200).json({ message: 'User registered, wallet registered' });
            }
        });
    });
};


module.exports = { loginUser, signupUser };
