const { getWalletBalance } = require("../queries/walletQueries");

const checkWalletBalance = async (req, res) => {
    const { id: user_id, token } = req.params;

    const { user_id: authenicated_user_id } = req.user;

    // verify if user to check is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        getWalletBalance(user_id, (error, balance) => {
            if (balance === null) {
                // User not found
                res.status(400).json({ message: 'No such user exists.' });
            } else {
                // Use the balance
                res.status(200).json({balance});
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while checking balance' });
    }

}

module.exports = { checkWalletBalance };
