const db = require("../db");

const createNewTransaction = (trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description, callback) => {
    db.query('INSERT INTO wallet.transactions (trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', [trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, date, description], (error, results) => {
        if (error) {
            console.error(error);
            callback(error, null);
        } else {
            callback(null, results); // Indicate success and return the results
        }
    });
};

module.exports = {
    createNewTransaction
}