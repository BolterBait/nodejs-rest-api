const { User } = require('../models/user');

async function register(req, res, next) {
    const { email, password } = req.body;
    try {
        const savedUser = await User.create({
            email, password
        });
        res.status(201).json({ data: { user: savedUser, }, });
    } catch (error) {
        console.error('error while saving user', error.message, error.name)
    }
}



module.exports = {
    register,
};