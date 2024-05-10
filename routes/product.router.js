const express = require("express");
const router = express.Router();

const productRouter = (productControllers) => {
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
