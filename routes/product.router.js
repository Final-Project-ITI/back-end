const express = require("express");
const router = express.Router();

const productRouter = (productControllers) => {
  router.get("/:restaurantId", (req, res) => {
    const respone = productControllers.getAllProducts();

    res.send(respone);
  });

  router.get("/:restaurantId/:productId", (req, res) => {
    const respone = productControllers.getUserProductsById();

    res.send(respone);
  });

  router.post("/admin", (req, res) => {
    const respone = productControllers.createProduct();

    res.send(respone);
  });

  router.patch("/admin/:productId", (req, res) => {
    const respone = productControllers.updateProduct();

    res.send(respone);
  });

  router.delete("/admin/:productId", (req, res) => {
    const respone = productControllers.deleteProduct();

    res.send(respone);
  });

  return router;
};

module.exports = productRouter;
