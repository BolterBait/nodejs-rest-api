const { User } = require('../models/user');
const { HttpError } = require('../helpers/index');

async function register(req, res, next) {
    const { email, password } = req.body;
    try {
        const savedUser = await User.create({
            email, password
        });
        res.status(201).json({ data: { user: savedUser, }, });
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error")) {
            throw new HttpError("User whis this email already exists");
        }
        throw error
    }
}



module.exports = {
    register,
};