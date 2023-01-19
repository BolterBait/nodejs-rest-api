const { User } = require('../models/user');
const { Conflict } = require('http-errors');


async function register(req, res, next) {
    const { email, password } = req.body;
    try {
        const savedUser = await User.create({
            email, password
        });
        res.status(201).json({ data: { user: savedUser, }, });
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error")) {
            throw Conflict("User whith this email already exists!!!")
        }

        throw error;
    }
}

module.exports = {
    register,
};