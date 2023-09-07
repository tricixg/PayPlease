const db = require("../db");

async function getUserByParam(param) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM wallet.users WHERE email = $1 OR username = $1 OR phone_number = $1', [param], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            resolve(results.rows[0])
        });
    });
}

// Function to fetch user by email
async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM wallet.users WHERE email = $1', [email], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
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
                resolve(results.rows.length > 0);
            }
        })
    });
}

async function insertUser(user) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO wallet.users (user_id, username, email, hashed_pw, phone_number, account_type) VALUES ($1, $2, $3, $4, $5, $6)', [user.user_id, user.username, user.email, user.hashedPassword, user.phone, user.account_type], (error, results) => {
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
    getUserByParam,
    getUserByEmail,
    isEmailTaken,
    insertUser,
}
