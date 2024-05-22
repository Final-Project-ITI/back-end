const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() { }

  user(authRepository) {
    return async (req, res, next) => {
      try {
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "WaRsM");
        const { _id } = payload;
        const user = await authRepository.getUser({ _id });

        if (!user) return res.status(401).send({ message: "unauthorized user" });

        if (!user.typeId.equals("663dfebba2ede177e6885e42"))
          return res.status(401).send({ message: "unauthorized user" });

        req.auth = user;

        next();
      } catch (error) {
        return res.status(403).send({ message: error.message });
      }
    };
  }

  admin(authRepository) {
    return async (req, res, next) => {
      try {
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "WaRsM");
        const { _id } = payload;
        const user = await authRepository.getUser({ _id });

        if (!user) return res.status(401).send({ message: "unauthorized user" });

        if (!user.typeId.equals("663dfe9ba2ede177e6885e41"))
          return res.status(401).send({ message: "unauthorized user" });

        req.auth = user;

        next();
      } catch (error) {
        return res.status(403).send({ message: error.message });
      }
    };
  }

  restaurantAdmin(authRepository) {
    return async (req, res, next) => {
      try {
        const token = req.headers["jwt"];

        if (!token) return res.status(401).send({ message: "unauthorized user" });

        const payload = jwt.verify(token, "WaRsM");
        const { _id } = payload;
        const user = await authRepository.getUser({ _id });

        if (!user) return res.status(401).send({ message: "unauthorized user" });

        if (!user.typeId.equals("663e9b24a2ede177e6885e45"))
          return res.status(401).send({ message: "unauthorized user" });

        req.auth = user;

        next();
      } catch (error) {
        return res.status(403).send({ message: error.message });
      }
    };
  }
}

module.exports = AuthMiddleware;
