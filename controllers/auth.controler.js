const { User } = require('../models/user');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function register(req, res, next) {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const savedUser = await User.create({
            email, password: hashedPassword,
        });
        res.status(201).json({ data: { user: { email, id: savedUser._id, } }, });
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error")) {
            throw Conflict("User whith this email already exists!!!")
        }
        throw error;
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;
    const storedUser = await User.findOne({ email, });
    if (!storedUser) {
        throw Unauthorized("Email or password is wrong");
    }
    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
        throw Unauthorized("Email or password is wrong");
    }
    const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const subscription = await storedUser.subscription;
    return res.status(200).json({
        data: {
            token, user: { email, subscription }
        }
    });
}

module.exports = {
    register,
    login,
};