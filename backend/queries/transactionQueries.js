const db = require("../db");

/**
 * 
 * @param {*} trx_id 
 * @param {*} trx_type 
 * @param {*} amount 
 * @param {*} debit_wallet_id 
 * @param {*} credit_wallet_id 
 * @param {*} date 
 * @param {*} description 
 */
async function createNewTransaction(trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description) {
    try {
        await db.query('INSERT INTO wallet.transactions (trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description])
    } catch (error) {
        console.log("Database Error: Error creating transaction");
        throw Error(error.message)
    }
};


async function getTransactionHistoryByWallet(wallet_id) {
    try {
        const transactions = await db.query(
            'SELECT * FROM wallet.transactions WHERE debit_wallet_id = $1 OR credit_wallet_id = $1 ORDER BY date DESC;',
            [wallet_id]);
        
        return transactions.rows;
    } catch (error) {
        console.log("Database Error: Error getting history from database");
        throw Error(error.message)
    }
}

module.exports = {
    createNewTransaction,
    getTransactionHistoryByWallet,
}