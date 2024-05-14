const express = require("express");
const router = express.Router();

const productRouter = (productControllers, authMiddleware) => {
  router.get(
    "/:restaurantId/products",
    authMiddleware.user(),
    async (req, res) => {
      try {
        const restaurantId = req.params.restaurantId;
        const response = await productControllers.getAllProducts(restaurantId);
        res.status(response.statusCode).send(response.data);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    }
  );

  router.get(
    "/:restaurantId/:productId",
    authMiddleware.user(),
    async (req, res) => {
      try {
        const { restaurantId, productId } = req.params;
        const response = await productControllers.getProductsById(
          restaurantId,
          productId
        );
        res.status(response.statusCode).send(response.data);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    }
  );
  router.post("/admin", authMiddleware.restaurantAdmin(), (req, res) => {
    const respone = productControllers.createProduct(req.body);

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
