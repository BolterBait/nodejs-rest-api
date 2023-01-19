const { User } = require('../models/user');
const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');

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

function login(req, res, next) {
    const { email, password } = req.body;
    res.json({ ok: true })
}

module.exports = {
    register,
    login,
};