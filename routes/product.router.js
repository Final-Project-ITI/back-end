const express = require("express");
const router = express.Router();

const productRouter = (productControllers, authMiddleware) => {
  function authenticateUser(token) {
    // Replace this with your actual authentication mechanism
    // Here, we are just checking if the token exists
    return !!token;
  }

  router.get("/:restaurantId/products", (req, res) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authenticateUser(authHeader)) {
      return res.status(401).send({ error: "Unauthorized access" });
    }

    const restaurantId = req.params.restaurantId;
    const response = productControllers.getAllProducts(restaurantId);
    res.status(response.statusCode).send(response.data);
  });

  router.get("/:restaurantId/:productId", (req, res) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authenticateUser(authHeader)) {
      return res.status(401).send({ error: "Unauthorized access" });
    }
    const { restaurantId, productId } = req.params;
    const response = productControllers.getProductsById(
      restaurantId,
      productId
    );

    res.status(response.statusCode).send(response.data);
  });

  router.post("/admin", authMiddleware.restaurantAdmin(), (req, res) => {
    const respone = productControllers.createProduct(req.body);

    res.send(respone);
  });

  router.patch(
    "/admin/:productId",
    authMiddleware.restaurantAdmin(),
    async (req, res, next) => {
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
    }
  );

  router.delete(
    "/admin/:productId",
    authMiddleware.restaurantAdmin(),
    async (req, res, next) => {
      try {
        const respone = await productControllers.deleteProduct(
          req.params.productId
        );
        res.status(respone.statusCode).send(respone.data);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = productRouter;
