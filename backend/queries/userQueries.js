const db = require("../db");

// Function to fetch user by email
async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM wallet.users WHERE email = $1', [email], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
                return res.status(500).json({ message: 'An error occurred while checking email' });
            }
            resolve(results.rows[0])
        });
    });
}

async function isEmailTaken(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT email FROM wallet.users WHERE email = $1', [email], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results.rows.lenth > 0);
            }
        })
    });
}

async function insertUser(user) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO wallet.users (user_id, username, email, hashed_pw, phone_number, account_type) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, username, email, hashedPassword, phone, accout_type], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    })
}


module.exports = {
    getUserByEmail,
    isEmailTaken,
    insertUser,
}
