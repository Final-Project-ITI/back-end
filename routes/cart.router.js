const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const cartRouter = (cartController, authMiddleware) => {
  router.get(
    "/",
    authMiddleware.user(cartController.authRepository),
    async (req, res, next) => {
      try {
        const cart = await cartController.getUserCart(req.auth._id);

        if (!cart) {
          res.status(200).send({ message: "cart is empty" });
        }

        res.status(200).send(cart);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    authMiddleware.user(cartController.authRepository),
    async (req, res, next) => {
      try {
        const newItem = await cartController.addItemToCart(
          req.body,
          req.auth._id
        );

        res.status(200).send(newItem);
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    "/:itemId",
    authMiddleware.user(cartController.authRepository),
    async (req, res, next) => {
      try {
        const updatedItem = await cartController.updateItem(req.body, req.params.itemId, req.auth._id);

        res.status(200).send(updatedItem);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/clear",
    authMiddleware.user(cartController.authRepository),
    async (req, res, next) => {
      try {
        const deletedCart = await cartController.clearUserCart(req.auth._id);

        res.status(200).send(deletedCart);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:itemId",
    authMiddleware.user(cartController.authRepository),
    async (req, res, next) => {
      try {
        const deletedItem = await cartController.deleteItemFromCart(
          req.params.itemId,
          req.auth._id
        );
        res.status(200).send(deletedItem);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = cartRouter;
