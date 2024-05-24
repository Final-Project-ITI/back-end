const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');

const cartRouter = (phoneController, authMiddleware) => {
    router.get(
        "/",
        authMiddleware.user(phoneController.authRepository),
        async (req, res, next) => {
            try {
                const phones = await phoneController.getUserPhoneNumbers(req.auth._id);

                if (!phones.length) {
                    res.status(200).send({ message: "no phones to show" });
                }
                res.status(200).send(phones);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/:phoneId",
        authMiddleware.user(phoneController.authRepository),
        async (req, res, next) => {
            try {
                const phone = await phoneController.getUserPhoneNumberById(req.auth._id, req.params.phoneId);

                if (!phone) {
                    res.status(200).send({ message: "no phone to show" });
                }
                res.status(200).send(phone);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post("/",
        authMiddleware.user(phoneController.authRepository),
        async (req, res, next) => {
            try {
                const newPhone = await phoneController.createUserPhoneNumber(req.auth._id, req.body.phoneNumber);

                res.status(200).send(newPhone);
            } catch (error) {
                next(error);
            }
        }
    );

    router.patch("/:phoneId",
        authMiddleware.user(phoneController.authRepository),
        async (req, res, next) => {
            try {
                const updatedPhone = await phoneController.updateUserPhoneNumberById(req.auth._id, req.params.phoneId, req.body);

                res.status(200).send(updatedPhone);
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete("/:phoneId",
        authMiddleware.user(phoneController.authRepository),
        async (req, res, next) => {
            try {
                const deletedPhone = await phoneController.deleteUserPhoneNumber(req.auth._id, req.params.phoneId);

                res.status(200).send(deletedPhone);
            } catch (error) {
                next(error);
            }
        }
    );


    return router;
};

module.exports = cartRouter;
