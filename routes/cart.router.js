const express = require("express");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get("/", (req, res) => {
    const response = cartController.getCartItems();
    res.send(response);
  });

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
