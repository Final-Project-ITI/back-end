const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');

const cartRouter = (cartController, authMiddleware) => {
  router.get(
    "/",
    authMiddleware.user(cartController.authService),
    asyncHandler(
      (req, res) => {
        const response = cartController.getCartItems()
        res.status(response.statusCode).send(response.data);
      }
    ));

  router.post("/",
    authMiddleware.user(cartController.authService),
    asyncHandler(
      async (req, res) => {
        const response = await cartController.addItemToCart(req.body, req.auth._id);

        res.status(response.statusCode).send(response.data);
      }
    ));

  router.patch("/", (req, res) => {
    const response = cartController.getCartItems()
    res.status(response.statusCode).send(response.data);
  });

  router.delete("/", (req, res) => {
    const response = cartController.getCartItems()
    res.status(response.statusCode).send(response.data);
  });

  router.delete("/clear", (req, res) => {
    const response = cartController.getCartItems()
    res.status(response.statusCode).send(response.data);
  });
  return router;
};

module.exports = cartRouter;
