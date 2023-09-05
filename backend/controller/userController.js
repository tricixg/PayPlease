const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { getUserByParam, getUserByEmail, isEmailTaken, insertUser } = require("../queries/userQueries");
const { createWallet } = require("../queries/walletQueries");
const jwt = require('jsonwebtoken');

function createToken(user_id) {
    return jwt.sign({user_id}, process.env.SECRET_KEY, {expiresIn: '2h'});
}

const findUser = async (req, res) => {
    const {username, email, phone, user_id} = req.query;

    // use only 1 to search
    const param = username || email || phone || user_id;

    console.log("param", param)
    try {
        const user = await getUserByParam(param);
        if (!user) {
            return res.status(400).json({ message: "No such user exists"});
        }

        res.status(200).json({username: user.username, email: user.email, phone: user.phone_number, user_id: user.user_id})

    } catch (err) {
        res.status(500).json({message: "error finding user"});
    }
};

const loginUser = async(req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: 'Email or password is wrong.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.hashed_pw);

        if (passwordMatch) {
            // Add code for session token creation here
            const token = createToken(user.user_id);
            res.status(200).json({user_id: user.user_id, token: token});
        } else {
            res.status(400).json({ message: 'Invalid Password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while checking email' });
    }
};

const signupUser = async(req, res) => {

    // Parameters for users table
    const user_id = uuidv4();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const account_type = 'User';

    // Parameters for wallets table
    const wallet_id = uuidv4();
    const balance = 0;

    try {
        const emailTaken = await isEmailTaken(email);

        if (emailTaken) {
            return res.status(400).json({ message: 'That email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        
        const user = {
            user_id,
            username,
            email,
            hashedPassword,
            phone,
            account_type
        };

        const userInsertResult = await insertUser(user);

        const wallet = {
            wallet_id,
            user_id, 
            balance,
        }

        await createWallet(wallet);

        return res.status(200).json({ message: 'User registered, wallet registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while registering user' });
    }
}

module.exports = { findUser, loginUser, signupUser };
