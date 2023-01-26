const { Unauthorized } = require("http-errors");
const { HttpError } = require("../helpers");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");


function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new HttpError(400, error.message));
        }
        return next();
    };
}

async function auth(req, res, next) {

    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");
    try {
    if (type !== "Bearer") {
        throw Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        

    if (!user || !user.token) {
        throw Unauthorized("Not authorized");
    }
    req.user = user;   
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            throw Unauthorized("Not authorized. Jwt token is not valid")
        }
        throw error;
    }
    next();
}




module.exports = {
    validateBody, auth,
} 