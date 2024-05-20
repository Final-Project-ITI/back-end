const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const cartRouter = (cartController, authMiddleware) => {
  router.get(
    "/:userId",
    // authMiddleware.user(cartController.authRepository),
    asyncHandler(async (req, res) => {
      const userId = req.params.userId;
      console.log(userId);
      const response = await cartController.getUserCart(userId);
      res.status(response.statusCode).send(response.data);
    })
  );
  router.post(
    "/",
    authMiddleware.user(cartController.authRepository),
    asyncHandler(async (req, res) => {
      const response = await cartController.addItemToCart(
        req.body,
        req.auth._id
      );

      res.status(response.statusCode).send(response.data);
    })
  );

  router.patch(
    "/",
    authMiddleware.user(cartController.authRepository),
    asyncHandler(async (req, res) => {
      const response = await cartController.updateItem(req.body, req.auth._id);

      res.status(response.statusCode).send(response.data);
    })
  );

  router.delete(
    "/",
    authMiddleware.user(cartController.authRepository),
    asyncHandler(async (req, res) => {
      const response = await cartController.addItemToCart(
        req.body,
        req.auth._id
      );

      res.status(response.statusCode).send(response.data);
    })
  );

  router.delete(
    "/clear",
    authMiddleware.user(cartController.authRepository),
    asyncHandler(async (req, res) => {
      const response = await cartController.clearUserCart(req.auth._id);

      res.status(response.statusCode).send(response.data);
    })
  );

  router.delete("/:itemId", async (req, res, next) => {
    try {
      const response = await cartController.deleteItemFromCart(
        req.params.itemId
      );
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = cartRouter;
