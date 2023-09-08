const db = require("../db");

/**
 * 
 * @param {*} wallet_id 
 * @param {*} amount_changed In dollars, negative for deductions.
 */
async function updateWalletBalance(wallet_id, amount_changed) {
    try {
        const balance = await db.query('SELECT balance FROM wallet.wallets WHERE wallet_id = $1', [wallet_id]);
        const newBalance = parseFloat(balance.rows[0].balance) + amount_changed;
        await db.query('UPDATE wallet.wallets SET balance = $1 WHERE wallet_id = $2', [newBalance, wallet_id]);

    } catch (error) {
        console.log("Database Error: Error updating wallet balance");
        throw Error(error.message)
    }

}

async function getWalletFromUserId(user_id) {
    try {
        const wallet = await db.query('SELECT * from wallet.wallets WHERE user_id = $1', [user_id])
        return wallet.rows[0]
    } catch (error) {
        console.log("Database Error: Error getting history from database");
        throw Error(error.message)
    }
}

async function getWalletIdFromUserId(user_id) {
    const wallet = await getWalletFromUserId(user_id);
    return wallet.wallet_id;
}

async function getBalanceFromUserId(user_id) {
    const wallet = await getWalletFromUserId(user_id);
    return parseFloat(wallet.balance);
}

// Function to create a wallet for a new user
async function createWallet(wallet) {
    try {
        await db.query(
            'INSERT INTO wallet.wallets (wallet_id, user_id, balance) VALUES ($1, $2, $3)',
            [wallet.wallet_id, wallet.user_id, wallet.balance]);
    } catch (error) {
        console.error("Database Error: Error creating wallet");
        throw Error(error.message);
    }
}

module.exports = {
    updateWalletBalance,
    getWalletFromUserId,
    getWalletIdFromUserId,
    getBalanceFromUserId,
    createWallet,
}


