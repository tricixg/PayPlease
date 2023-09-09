const { getUsernameFromWalletId, getUserById } = require("../queries/userQueries");
const { getBalanceFromUserId } = require("../queries/walletQueries");

const checkWalletBalance = async (req, res) => {
    const { id: user_id } = req.params;
    const { user_id: authenicated_user_id } = req.user;

    // verify if user to check is the same as user who made the request
    if (authenicated_user_id !== user_id) {
        return res.status(401).json({message: 'unauthorized'});
    }

    try {
        const balance = await getBalanceFromUserId(user_id)
        const user = await getUserById(user_id);
        const username = user.username;
        if (balance === null) {
            // User wallet not found
            return res.status(400).json({ message: 'No such user exists.' });
        }
        res.status(200).json({balance, username});

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while checking balance' });
    }

}

module.exports = { checkWalletBalance };
