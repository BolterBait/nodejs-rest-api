function tryCatchWrapper(endpointFn) {
    return async (req, res, next) => {
        try {
            await endpointFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
}

class HttpError extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpError";
    }
}

module.exports = {
    tryCatchWrapper,
    HttpError,
};
