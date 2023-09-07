const db = require("../db");
const { v4: uuidv4 } = require('uuid');

const { createNewTransaction, getTransactionHistoryByWallet } = require('../queries/transactionQueries');
const { updateWalletBalance, getWalletFromUserId, getWalletIdFromUserId } = require('../queries/walletQueries');

// TODO secret key in .env
const stripe = require('stripe')("sk_test_51NkrWXA2kau6fLsqOyJvGAXseIIyHNbf0ejoks9cs9bI7FWVjzqwyw9boj67ilx8FQfG9nzfWnuhPrZvmW8bJsD400a8z6IqeR");

const emptyUUID = "00000000-0000-0000-0000-000000000000";

const getTransactionHistory = async (req, res) => {
    const { id: user_id } = req.params;
    const { user_id: authenicated_user_id } = req.user;

    // verify if user to check is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const wallet_id = await getWalletIdFromUserId(user_id);

        if (!wallet_id) {
            return res.status(400).json({message: "User does not exist"});
        }

        const transactions = await getTransactionHistoryByWallet(wallet_id);
        res.status(200).json({ transactions });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred while checking history' });
    }
}

const topUpTransaction = async (req, res) => {
    
    let {user_id, amount, stripe_token} = req.body;
    const { user_id: authenicated_user_id } = req.user;

    // amount must be integer in cents.
    dollarAmount = parseFloat(amount.toFixed(2));
    centAmount = dollarAmount * 100;

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
            email: stripe_token.email,
            source: stripe_token.id,
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
        
        updateWalletBalance(wallet_id, dollarAmount);

        res.status(200).json({ message: "topup successful" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

}

const withdrawTransaction = async (req, res) => {
    let {user_id, amount, user_stripe_id} = req.body;
    const { user_id: authenicated_user_id } = req.user;

    // amount must be integer in cents.
    dollarAmount = parseFloat(amount.toFixed(2));
    centAmount = dollarAmount * 100;

    // verify if user to topUp is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const wallet_id = await getWalletIdFromUserId(user_id);
        if (!wallet_id) {
            throw Error("wallet does not exist")
        }

        console.log(user_stripe_id)

        try {
            const account = await stripe.accounts.retrieve(user_stripe_id);
            console.log(account);
          } catch (error) {
            console.error(error);
          }

        const transfer = await stripe.transfers.create({
            amount: centAmount,
            currency: 'sgd',
            destination: user_stripe_id,
        });

        await createNewTransaction(
            uuidv4(),
            "Withdraw",
            dollarAmount,
            wallet_id,
            emptyUUID,
            new Date(),
            "",
        );
        
        updateWalletBalance(wallet_id, dollarAmount * -1);

        res.status(200).json({ message: "withdraw successful" });

    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }


}


async function transferTransaction(req, res) {
    const debit_uid = req.body.debit_user_id;
    const credit_uid = req.body.credit_user_id;
    const amountValue = req.body.amount; // in dollars
    const transfer_description = req.body.description;

    const { user_id: authenicated_user_id } = req.user;

    // verify if debited user is the same as user who made the request
    if (authenicated_user_id !== debit_uid) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const debit_wallet = await getWalletFromUserId(debit_uid);
        const credit_wallet = await getWalletFromUserId(credit_uid);
        if (!debit_wallet || !credit_wallet) {
            return res.status(400).json({ message: 'No such user exists.' });
        }

        const debit_wallet_id = debit_wallet.wallet_id;
        const debitor_balance = parseFloat(debit_wallet.balance);
        const credit_wallet_id = credit_wallet.wallet_id;

        // Check if debitor has sufficient balance
        if (debitor_balance < amountValue) {
            return res.status(400).json({message: "Insufficient balance in your account."})
        }

        const trx_id = uuidv4();
        const trx_type = 'Transfer';
        const amount = parseFloat(amountValue.toFixed(2));
        const currentDate = new Date();
        
        await createNewTransaction(trx_id, trx_type, amount, debit_wallet_id, credit_wallet_id, currentDate, transfer_description)

        // Update debitor and creditor balance
        updateWalletBalance(debit_wallet_id, amount * -1) // deduction
        updateWalletBalance(credit_wallet_id, amount) 

        res.status(200).json({ message: "Successfully transfered" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while processing transaction' });
    }
}

module.exports = { getTransactionHistory, topUpTransaction, withdrawTransaction, transferTransaction };
