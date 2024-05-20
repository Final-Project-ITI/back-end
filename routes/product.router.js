const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const productRouter = (productController, authMiddleware) => {
  router.get(
    "/:restaurantId",
    asyncHandler(async (req, res) => {
      const restaurantId = req.params.restaurantId;

      const response = await productController.getAllProducts(restaurantId);
      res.status(response.statusCode).send(response.data);
    })
  );

  router.get(
    "/:restaurantId/:productId",
    asyncHandler(async (req, res) => {
      const { restaurantId, productId } = req.params;

      const response = await productController.getRestaurantsProductsById(
        restaurantId,
        productId
      );

      res.status(response.statusCode).send(response.data);
    })
  );

  router.post("/admin",
    authMiddleware.restaurantAdmin(productController.authRepository),
    async (req, res) => {
      const response = await productController.createProduct(req.body, req.auth);

      res.send(response);
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
