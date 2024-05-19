const jwt = require('jsonwebtoken');

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

    admin(authService) {
        return async (req, res, next) => {
            const token = req.headers["jwt"];

            if (!token) return res.status(401).send({ message: "unauthorized user" });

            const payload = jwt.verify(token, "WaRsM");

            const { _id } = payload;

            const user = await authService.getUser({ _id });

            if (!user) return res.status(401).send({ message: "unauthorized user" });

            if (!(user.typeId.equals("663dfe9ba2ede177e6885e41"))) return res.status(401).send({ message: "unauthorized user" });

            req.auth = user;

            next();
        }

    }

    restaurantAdmin(authService) {
        return async (req, res, next) => {
            const token = req.headers["jwt"];

            if (!token) return res.status(401).send({ message: "unauthorized user" });

            const payload = jwt.verify(token, "WaRsM");

            const { _id } = payload;

            const user = await authService.getUser({ _id });

            if (!user) return res.status(401).send({ message: "unauthorized user" });

            if (!(user.typeId.equals("663e9b24a2ede177e6885e45"))) return res.status(401).send({ message: "unauthorized user" });

            req.auth = user;

            next();
        }

    }
}

module.exports = AuthMiddleware;
