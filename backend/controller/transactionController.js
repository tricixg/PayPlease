const db = require("../db");
const { v4: uuidv4 } = require('uuid');
const {createNewTransaction} = require('../queries/transactionQueries');
const {changeWalletBalance, updateWalletBalance, getWalletIdFromUserId} = require('../queries/walletQueries');
// TODO secret key in .env
const stripe = require('stripe')("sk_test_51NkrWXA2kau6fLsqOyJvGAXseIIyHNbf0ejoks9cs9bI7FWVjzqwyw9boj67ilx8FQfG9nzfWnuhPrZvmW8bJsD400a8z6IqeR");

const emptyUUID = "00000000-0000-0000-0000-000000000000";

const getTransactionHistory = (req, res) => {
    console.log("transaction history");
    res.status(200).json("transaction history");
}

const topUpTransaction = async (req, res) => {
    
    let {user_id, amount, token} = req.body;
    const { user_id: authenicated_user_id } = req.user;

    // amount must be integer in cents.
    amount = parseInt(amount);
    dollarAmount = amount / 100;

    // verify if user to topUp is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const wallet_id = await getWalletIdFromUserId(user_id);
        const idempotencyKey = uuidv4();
        if (!wallet_id) {
            throw Error("wallet does not exist")
        }

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'sgd',
            customer: customer.id,
            description: "topup wallet"
        }, {idempotencyKey});

        await createNewTransaction(
            uuidv4(),
            "Topup",
            dollarAmount,
            emptyUUID,
            wallet_id,
            new Date(),
            "",
        );
        
        changeWalletBalance(wallet_id, dollarAmount);

        res.status(200).json({amount: dollarAmount});
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

}

const withdrawTransaction = (req, res) => {
    console.log("withdraw");
    res.status(200).json("withdraw");
}

async function transferTransaction(req, res) {
    const debit_uid = req.body.debit_user_id;
    const credit_uid = req.body.credit_user_id;
    const amountValue = req.body.amount;
    const transfer_description = req.body.description;

    const { user_id: authenicated_user_id } = req.user;

    // verify if debited user is the same as user who made the request
    if (authenicated_user_id !== debit_uid) {
        return res.status(401).json({message: 'unauthorized'});
    }

    let credit_wallet_id = uuidv4();
    let debit_wallet_id = uuidv4();
    let creditor_balance = 0;
    let debitor_balance = 0;

    try {
        const results = await db.query('SELECT * FROM wallet.wallets WHERE user_id = $1', [debit_uid])
        if (results.rows.length == 0) {
            return res.status(400).json({ message: 'No such user exists.' });
        }
        const debitor = results.rows[0];
        debit_wallet_id = debitor.wallet_id;
        debitor_balance = parseFloat(debitor.balance);

        // Check if debitor's account have enough balance to transfer out.
        if (debitor_balance < amountValue) {
            return res.status(400).json({message: "Insufficient balance in your account."})
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while checking balance' });
    }

    try {
        const results = await db.query('SELECT * FROM wallet.wallets WHERE user_id = $1', [credit_uid])
        if (results.rows.length == 0) {
            return res.status(400).json({ message: 'No such user exists.' });
        }

        const creditor = results.rows[0];
        credit_wallet_id = creditor.wallet_id;
        creditor_balance = parseFloat(creditor.balance);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while checking balance' });
    }

    // Create transaction entry
    const trx_id = uuidv4();
    const trx_type = 'Transfer';
    const amount = parseFloat(amountValue);
    const currentDate = new Date();

    createNewTransaction(trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, currentDate, transfer_description, (error, results) => {
        if (error) {
            console.error('Failed to insert transaction:', error);
            return res.status(500).json({ message: 'An error occurred while inserting transaction' });
        } else {
            console.log('Transaction inserted successfully.');
            return res.status(200).json({ message: 'Transaction successful.' });
        }
    });

    // Update debitor and creditor balance
    const debitor_new_balance = debitor_balance - amount;
    const creditor_new_balance = creditor_balance + amount;

    console.log(credit_uid, credit_wallet_id, creditor_balance);
    console.log("new balance debit/credit:", debitor_new_balance, creditor_new_balance);
    updateWalletBalance(debitor_new_balance, debit_wallet_id, (error, results) => {
        if (error) {
            console.error('Failed to update wallet balance:', error);
        } else {
            console.log('Debit wallet balance updated successfully.');
        }
    });
    updateWalletBalance(creditor_new_balance, credit_wallet_id, (error, results) => {
        if (error) {
            console.error('Failed to update wallet balance:', error);
        } else {
            console.log('Credit wallet balance updated successfully.');
        }
    });

}

module.exports = { getTransactionHistory, topUpTransaction, withdrawTransaction, transferTransaction };
