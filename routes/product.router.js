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

  router.patch("/admin/:productId", async (req, res, next) => {
    try {
      const updatedProductData = req.body;
      const response = await productControllers.updateProduct(
        req.params.productId,
        updatedProductData
      );
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/admin/:productId", async (req, res, next) => {
    try {
      const respone = await productControllers.deleteProduct(
        req.params.productId
      );
      res.status(respone.statusCode).send(respone.data);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = productRouter;
