const AppError = require('../utilts/AppError')
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const { access } = require('fs');
const sign = util.promisify(jwt.sign);


const signup = async (req, res) => {
    const body = req.body;
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    const saltRounds = Number(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const user = await User.create({
        ...body,
        password: hashedPassword
    });
    res.status(200).json({ message: "user created", user: user });
};

const login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    const jwtsecret = process.env.JWTSECRET;
    const expirtime = "1d";
    const token = await sign({ id: user._id }, jwtsecret, { expiresIn: expirtime });
    res.status(200).json({
        message: "login successful",
        access_token: token,
        user: user
    });

};

module.exports = {
    signup,
    login
};