const db = require("../db");

// TODO: replaces references with changeWalletBalance
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

/**
 * 
 * @param {*} wallet_id 
 * @param {*} amount_changed In dollars, negative for deductions.
 */
async function changeWalletBalance(wallet_id, amount_changed) {
    try {
        const balance = await db.query('SELECT balance FROM wallet.wallets WHERE wallet_id = $1', [wallet_id])[0];
        const newBalance = balance + amount_changed
        await db.query('UPDATE wallet.wallets SET balance = $1 WHERE wallet_id = $2', [newBalance, wallet_id]);

    } catch (error) {
        throw Error(error.message)
    }

}

async function getWalletIdFromUserId(user_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT wallet_id from wallet.wallets WHERE user_id = $1', [user_id], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results.rows[0].wallet_id);
            }
        })
    })
}

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
    changeWalletBalance,
    updateWalletBalance,
    getWalletIdFromUserId,
    createWallet,
    getWalletBalance,
    getWalletId
}


