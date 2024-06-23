const express = require("express");
const router = express.Router();

const notificationTypeRouter = (notificationTypeController, authMiddleware) => {
    router.get(
        "/",
        async (req, res, next) => {
            try {
                const notificationTypes = await notificationTypeController.getAllNotificationTypes();
                res.status(200).send(notificationTypes);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        "/",
        authMiddleware.restaurantCashier(notificationTypeController.authRepository),
        async (req, res, next) => {
            try {
                const newNotificationType = await notificationTypeController.createNotificationType(req.body);
                res.status(201).send(newNotificationType);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

module.exports = notificationTypeRouter;