const { getWalletBalance } = require("../queries/walletQueries");

const checkWalletBalance = async (req, res) => {
    const { id: user_id } = req.params;

    const { user_id: authenicated_user_id } = req.user;

    // verify if user to check is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const balance = await getWalletBalance(user_id);

        if (balance === null) {
            return res.status(400).json({ message: 'No such user exists.' });
        }

        res.status(200).json({balance});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred while checking balance' });
    }

}

module.exports = { checkWalletBalance };
