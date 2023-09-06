const db = require("../db");

function queryTransactionHistory(wallet_id, callback) {
  const query = `
    SELECT *
    FROM wallet.transactions
    WHERE debit_wallet_id = $1 OR credit_wallet_id = $1
    ORDER BY date DESC;`;

  db.query(query, [wallet_id], (error, result) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      callback(error, null);
    } else {
      const transactions = result.rows;
      callback(null, transactions);
    }
  });
}

module.exports = {
  queryTransactionHistory,
};
