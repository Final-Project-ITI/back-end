const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');

const authRouter = (authController, authMiddleware) => {
  router.post(
    "/login",
    async (req, res, next) => {
      try {
        const token = await authController.login(req.body);

        res.status(200).send(token);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/register",
    async (req, res, next) => {
      try {
        const token = await authController.register(req.body);

        res.status(201).send(token);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/admin/register/cashier",
    authMiddleware.restaurantAdmin(authController.authRepository),
    async (req, res, next) => {
      try {
        const token = await authController.register(req.body, req.auth.restaurantId);

        res.status(201).send(token);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
module.exports = authRouter;