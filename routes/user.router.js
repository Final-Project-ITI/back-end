const express = require("express");
const router = express.Router();

const userRouter = (userController, authMiddleware, paginationMiddleware) => {
    router.get(
        "/",
        authMiddleware.anyUser(userController.authRepository),
        async (req, res, next) => {
            try {
                const user = await userController.getUser(req.auth._id);

                res.status(200).send(user);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/restaurantsAdmins",
        authMiddleware.admin(userController.authRepository),
        paginationMiddleware.paginate(3),
        async (req, res, next) => {
            try {
                const admins = await userController.getRestaurantsAdmins(req.pagination);

                res.status(200).send(admins);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/restaurantCashiers",
        authMiddleware.restaurantAdmin(userController.authRepository),
        async (req, res, next) => {
            try {
                const cashiers = await userController.getRestaurantCashiers(req.auth.restaurantId);

                res.status(200).send(cashiers);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

module.exports = userRouter;
