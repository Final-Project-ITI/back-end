const express = require("express");
const router = express.Router();

const cartRouter = (cartController) => {
  router.get("/", async (req, res) => {
    try {
      const response = await cartController.getUserCart();
      res.send(response);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  return router;
};

module.exports = cartRouter;
