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

async function getWalletBalance(user) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM wallet.wallets WHERE user_id = $1', [user_id], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
                return res.status(500).json({ message: 'An error occurred while checking balance' });
            } else {
                resolve(results.rows.length > 0 ? results.rows[0].balance : null);
            }
            
        
            if (results.rows.length == 0) {
                return res.status(400).json({ message: 'No such user exists.' });
            }
        
            console.log(results.rows[0]);
            const user = results.rows[0];
            const balance = user.balance;
            res.status(200).json({balance});
        });
    })
}




module.exports = {
    updateWalletBalance,
    createWallet,
    getWalletBalance
}


