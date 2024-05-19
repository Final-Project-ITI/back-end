const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const orderRouter = (orderControllers, authMiddleware) => {
  router.get(
    "/authorization",
    authMiddleware.admin(orderControllers.authService),
    async (req, res) => {
      const response = await orderControllers.getAllOrders();
      res.status(response.statusCode).send(response.data);
    }
  );

  router.get(
    "/admin",
    authMiddleware.restaurantAdmin(orderControllers.authService),
    async (req, res) => {
      const response = await orderControllers.getAllRestaurantOrders(req.auth);

      res.status(response.statusCode).send(response.data);
    }
  );

  router.get("/admin/:orderId", (req, res) => {
    const response = orderControllers.getRestaurantOrderById();

    res.send(response);
  });

  router.get("/user", (req, res) => {
    const response = orderControllers.getAllUserOrders();

    res.send(response);
  });

  router.get("/user/:orderId", (req, res) => {
    const response = orderControllers.getUserOrderById();

    res.send(response);
  });

  router.post(
    "/:restaurantId/user",
    authMiddleware.user(orderControllers.authService),
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
