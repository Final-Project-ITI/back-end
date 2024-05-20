const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const orderRouter = (orderControllers, authMiddleware) => {
  router.get(
    "/authorization",
    authMiddleware.admin(orderControllers.authRepository),
    async (req, res) => {
      const response = await orderControllers.getAllOrders();
      res.status(response.statusCode).send(response.data);
    }
  );

  router.get(
    "/admin",
    authMiddleware.restaurantAdmin(orderControllers.authRepository),
    async (req, res) => {
      const response = await orderControllers.getAllRestaurantOrders(req.auth);

      res.status(response.statusCode).send(response.data);
    }
  );

  router.get("/admin/:orderId", (req, res) => {
    const response = orderControllers.getRestaurantOrderById();

    res.send(response);
  });

  router.get(
    "/:userId",
    authMiddleware.user(orderControllers.authRepository),
    async (req, res) => {
      const userId = req.params.userId;
      const response = await orderControllers.getAllUserOrders(userId);
      res.status(response.statusCode).send(response.data);
    }
  );

  router.get(
    "/:userId/:orderId",
    authMiddleware.user(orderControllers.authRepository),
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

  router.patch("/cashier/:orderId", async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      if (!status) {
        return res.status(400).send({ error: "Order status is required" });
      }

      const response = await orderControllers.updateOrderStatus(
        orderId,
        status
      );
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = orderRouter;
