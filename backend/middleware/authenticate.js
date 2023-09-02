const db = require("../db")
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    // authorization = 'Bearer "TOKEN"'
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "unauthorized"})
    }
    const token = authorization.split(' ')[1]
    try {
        // get user_id from body of token after verifying with secret key
        const { user_id } = jwt.verify(token, process.env.SECRET_KEY);

        // add user_id and created token to req
        db.query('SELECT user_id FROM wallet.users WHERE user_id = $1', [user_id], async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error authenticating user' });
            }
    
            if (results.rows.length == 0) {
                return res.status(401).json({ message: 'unauthorized token, no such user exists' });
            }
            console.log(results.rows[0]);
            const user = results.rows[0];
            req.user = user;
            console.log("Auth successful")
            next();
        })


    } catch (error) {
        console.log(error.message)
        res.status(401).json({error: "unauthorized"})
    }
};

module.exports = authenticate;
