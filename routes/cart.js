const express = require("express");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get("/", (req, res) => {
    const response = cartController.getCartItems()
    res.send(response);
  });

  return router;
};

module.exports = cartRouter;
