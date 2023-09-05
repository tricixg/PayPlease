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
const createNewTransaction = (trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO wallet.transactions (trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description], 
        (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results)
            }
        });
    })
};

module.exports = {
    createNewTransaction
}