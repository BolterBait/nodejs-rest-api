const messages = {
    400: "Missing required name field",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};

function tryCatchWrapper(endpointFn) {
    return async (req, res, next) => {
        try {
            await endpointFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
}

function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

module.exports = {
    tryCatchWrapper,
    HttpError,
};
