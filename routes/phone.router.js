const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');

const cartRouter = (phoneController, authMiddleware) => {
    router.get(
        "/",
        authMiddleware.user(phoneController.authService),
        asyncHandler(
            async (req, res) => {
                const response = await phoneController.getUserPhoneNumbers(req.auth._id)
                res.status(response.statusCode).send(response.data);
            }
        ));

    router.post("/",
        authMiddleware.user(phoneController.authService),
        asyncHandler(
            async (req, res) => {
                const response = await phoneController.createUserPhoneNumber(req.body, req.auth._id);

                res.status(response.statusCode).send(response.data);
            }
        ));

    router.patch("/",
        authMiddleware.user(phoneController.authService),
        asyncHandler(
            async (req, res) => {
                const response = await phoneController.updateUserPhoneNumberById(req.body, req.auth._id);

                res.status(response.statusCode).send(response.data);
            }
        ));

    router.delete("/",
        authMiddleware.user(phoneController.authService),
        asyncHandler(
            async (req, res) => {
                const response = await phoneController.deleteUserPhoneNumber(req.body, req.auth._id);

                res.status(response.statusCode).send(response.data);
            }
        ));


    return router;
};

module.exports = cartRouter;
