const db = require("../db");

async function getUserById(user_id) {
    try {
        const user = await db.query(
            'SELECT * FROM wallet.users WHERE user_id = $1', 
            [user_id]);
        return user.rows[0];
    } catch (error) {
        console.log("Database Error: Error getting user by id");
        throw Error(error.message);
    }
}

async function getUserByUsername(username) {
    try {
        const user = await db.query(
            'SELECT * FROM wallet.users WHERE username = $1', 
            [username]);
        return user.rows[0];
    } catch (error) {
        console.log("Database Error: Error getting user by username");
        throw Error(error.message);
    }
}

// Function to fetch user by email
async function getUserByEmail(email) {
    try {
        const user = await db.query('SELECT * FROM wallet.users WHERE email = $1', [email]);
        return user.rows[0];
    } catch (error) {
        console.log("Database Error: Error getting user by email");
        throw Error(error.message);
    }
}

async function getUserByPhone(phone_number) {
    try {
        const user = await db.query(
            'SELECT * FROM wallet.users WHERE phone_number = $1', 
            [phone_number]);
        return user.rows[0];
    } catch (error) {
        console.log("Database Error: Error getting user by phone");
        throw Error(error.message);
    }
}

async function isEmailTaken(email) {
    try {
        const results = await db.query('SELECT email FROM wallet.users WHERE email = $1', [email]);
        return results.rows.lenth > 0;
    } catch (error) {
        console.log("Database Error: Error checking if email taken");
        throw Error(error.message);
    }
}

async function insertUser(user) {
    try {
        await db.query(
            'INSERT INTO wallet.users (user_id, username, email, hashed_pw, phone_number, account_type) VALUES ($1, $2, $3, $4, $5, $6)', 
            [user.user_id, user.username, user.email, user.hashedPassword, user.phone, user.account_type]);
    } catch (error) {
        console.log("Database Error: Error inserting user");
        throw Error(error.message);
    }
}


module.exports = {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUserByPhone,
    isEmailTaken,
    insertUser,
}
