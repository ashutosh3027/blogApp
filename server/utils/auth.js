const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.jwt) {
            req.body.user = null;
            console.log("Empty");
            return next();
        }
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) req.body.user = null;
            else req.body.user = user.user;
        });
        console.log(req.body.user);
        next();
    } catch (err) {
        console.log("catch error", err);
        next();
    }
}

module.exports = { authorization };