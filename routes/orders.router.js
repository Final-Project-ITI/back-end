const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const orderRouter = (orderControllers, authMiddleware) => {
  router.get(
    "/authorization",
    authMiddleware.admin(orderControllers.authRepository),
    (req, res) => {
      const response = orderControllers.getAllOrders();

      res.send(response);
    }
  );

  router.get("/admin", (req, res) => {
    const response = orderControllers.getAllRestaurantOrders();

    res.send(response);
  });

  router.get("/admin/:orderId", (req, res) => {
    const response = orderControllers.getRestaurantOrderById();

    res.send(response);
  });

  router.get(
    "/:userId",
    // authMiddleware.user(orderControllers.authRepository),
    async (req, res) => {
      const userId = req.params.userId;
      const response = await orderControllers.getAllUserOrders(userId);
      res.status(response.statusCode).send(response.data);
    }
  );

  router.get(
    "/:userId/:orderId",
    // authMiddleware.user(orderControllers.authRepository),
    async (req, res) => {
      const { userId, orderId } = req.params;
      const response = await orderControllers.getUserOrderById(userId, orderId);
      res.status(response.statusCode).send(response.data);
    }
  );

  router.post(
    "/:restaurantId/user",
    authMiddleware.user(orderControllers.authRepository),
    asyncHandler(async (req, res) => {
      const response = await orderControllers.createNewOrder(
        req.body,
        req.auth._id,
        req.params.restaurantId
      );

      res.status(response.statusCode).send(response.data);
    })
  );

  router.patch("/cashier/:orderId", (req, res) => {
    const response = orderControllers.updateOrderStatus();

    res.send(response);
  });

  return router;
};

module.exports = orderRouter;
