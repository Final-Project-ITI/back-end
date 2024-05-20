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

  router.patch("/", (req, res) => {
    const response = cartController.getCartItems();
    res.status(response.statusCode).send(response.data);
  });

  router.delete("/", (req, res) => {
    const response = cartController.getCartItems();
    res.status(response.statusCode).send(response.data);
  });

  router.delete("/clear", (req, res) => {
    const response = cartController.getCartItems();
    res.status(response.statusCode).send(response.data);
  });
  return router;
};

module.exports = cartRouter;
