const jwt = require("jsonwebtoken");
const util=require("util");
const AppError = require('../utilts/AppError')
const User = require("../models/user");
const verify = util.promisify(jwt.verify);

const auth = async (req, res, next) => {
    const taken = req.headers.authorization?.split(" ")[1];
    if (!taken) {
        throw new AppError("no token ", 401);
    }
    const jwtsecret = process.env.JWTSECRET;
    const payload = await verify(taken, jwtsecret);
    // console.log("Decoded Payload:", payload);
    const user = await User.findById(payload.id);
    if (!user) {
        throw new AppError("user not found or has been deleted", 404);
    }
    req.user = user;
    next();

};

module.exports = auth;