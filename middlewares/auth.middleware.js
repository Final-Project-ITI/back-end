const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

class AuthMiddleware {

    constructor() { }

    user(authService) {
        return async (req, res, next) => {
            const token = req.headers["jwt"];

            if (!token) return res.status(401).send({ message: "unauthorized user" });

            const payload = jwt.verify(token, "WaRsM");

            const { _id } = payload;

            const user = await authService.getUser({ _id });

            if (!user) return res.status(401).send({ message: "unauthorized user" });

            req.auth = user;

            next();
        }
    }
}

module.exports = AuthMiddleware;
