const express = require("express");
const router = express.Router();

const notificationRouter = (notificationController, authMiddleware) => {
    router.get(
        "/user",
        authMiddleware.user(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const notifications = await notificationController.getAllUserNotification(req.auth._id);

                res.status(200).send(notifications);
            } catch (error) {
                next(error);
            }
        }
    );
    router.get(
        "/delivery",
        authMiddleware.anyUser(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const notifications = await notificationController.getAllDeliveryNotification();

                res.status(200).send(notifications);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/user/:id",
        authMiddleware.user(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const notification = await notificationController.getAllUserNotificationById(req.params.id, req.auth._id);

                res.status(200).send(notification);
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete(
        "/user/:id",
        authMiddleware.user(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const notification = await notificationController.deleteNotification(req.params.id, req.auth._id);

                res.status(200).send(notification);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        "/user",
        authMiddleware.restaurantCashier(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const newNotifications = await notificationController.createUserNotification(req.body);

                res.status(200).send(newNotifications);
            } catch (error) {
                next(error);
            }
        }
    );

    router.patch(
        "/user",
        authMiddleware.user(notificationController.authRepository),
        async (req, res, next) => {
            try {
                const updatedNotifications = await notificationController.updateUserNotification(req.body.ids);

                res.status(200).send(updatedNotifications);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

module.exports = notificationRouter;
