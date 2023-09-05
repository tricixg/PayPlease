const db = require("../db");

const updateWalletBalance = (newBalance, walletId, callback) => {
    db.query('UPDATE wallet.wallets SET balance = $1 WHERE wallet_id = $2', [newBalance, walletId], (error, results) => {
        if (error) {
            console.error(error);
            callback(error);
        } else {
            callback(null); // Indicate success
        }
    });
};

// Function to create a wallet for a new user
async function createWallet(wallet) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO wallet.wallets (wallet_id, user_id, balance) VALUES ($1, $2, $3)',
            [wallet.wallet_id, wallet.user_id, wallet.balance],
            (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results);
            }
            }
        );
    });
}

function getWalletBalance(user_id, callback) {
    db.query('SELECT * FROM wallet.wallets WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            console.error(error);
            callback(error, null);
        } else {
            if (results.rows.length === 0) {
                callback(null, null); // User not found
            } else {
                const user = results.rows[0];
                const balance = user.balance;
                callback(null, balance);
            }
        }
    });
}

// Get corresponding wallet_id
function getWalletId(user_id, callback) {
    db.query('SELECT * FROM wallet.wallets WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            console.error(error);
            callback(error, null);
        } else {
            if (results.rows.length === 0) {
                callback(null, null);
            }
            console.log(results.rows[0]);
            const user = results.rows[0];
            const wid = user.wallet_id;
            callback(null, wid);
        }
    });
}




module.exports = {
    updateWalletBalance,
    createWallet,
    getWalletBalance,
    getWalletId
}


