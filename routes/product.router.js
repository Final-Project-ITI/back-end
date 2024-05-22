const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const productRouter = (productController, authMiddleware) => {
  router.get(
    "/:restaurantId",
    async (req, res, next) => {
      try {
        const products = await productController.getAllProducts(req.params.restaurantId);

        res.status(200).send(products);
      } catch (error) {
        next(error)
      }
    }
  );

  router.get(
    "/:restaurantId/:productId",
    async (req, res, next) => {
      try {
        const { restaurantId, productId } = req.params;

        const product = await productController.getRestaurantsProductsById(
          restaurantId,
          productId
        );

        res.status(200).send(product);
      } catch (error) {
        next(error)
      }
    }
  );

  router.post(
    "/admin",
    authMiddleware.restaurantAdmin(productController.authRepository),
    async (req, res, next) => {
      try {
        const newProduct = await productController.createProduct(req.body, req.auth);

        res.status(201).send(newProduct);
      } catch (error) {
        next(error);
      }
    });

  router.patch(
    "/admin/:productId",
    authMiddleware.restaurantAdmin(productController.authRepository),
    async (req, res, next) => {
      try {
        const updatedProduct = await productController.updateProduct(
          req.body,
          req.params.productId,
          req.auth
        );

        res.status(200).send(updatedProduct);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/admin/:productId",
    authMiddleware.restaurantAdmin(productController.authRepository),
    async (req, res, next) => {
      try {
        const isDeleted = await productController.deleteProduct(
          req.params.productId,
          req.auth
        );
        res.status(200).send(isDeleted);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = productRouter;
