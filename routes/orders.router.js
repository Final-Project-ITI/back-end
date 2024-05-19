const express = require("express");
const router = express.Router();

const orderRouter = (orderControllers) => {
  router.get("/authorization", (req, res) => {
    const respone = orderControllers.getAllOrders();

    res.send(respone);
  });

  router.get("/admin", (req, res) => {
    const respone = orderControllers.getAllRestaurantOrders();

    res.send(respone);
  });

  router.get("/admin/:orderId", async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      const response = await orderControllers.getRestaurantOrderById(orderId);
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      next(error);
    }
  });

  router.get("/user", (req, res) => {
    const respone = orderControllers.getAllUserOrders();

    res.send(respone);
  });

  router.get("/user/:orderId", (req, res) => {
    const respone = orderControllers.getUserOrderById();

    res.send(respone);
  });

  router.post("/:restaurantId/user", (req, res) => {
    const respone = orderControllers.createNewOrder();

    res.send(respone);
  });

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
