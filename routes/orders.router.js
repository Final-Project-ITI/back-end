const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const orderRouter = (orderControllers, authMiddleware) => {
  router.get(
    "/authorization",
    authMiddleware.admin(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const orders = await orderControllers.getAllOrders();

        res.status(200).send(orders);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/cashier",
    authMiddleware.restaurantCashier(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const orders = await orderControllers.getAllRestaurantOrders(req.auth);

        res.status(200).send(orders);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/cashier/filter",
    authMiddleware.restaurantCashier(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const { startDate, endDate } = req.query;
        const restaurantAdmin = req.auth;
        const orders = await orderControllers.getFilteredOrdersByDate(restaurantAdmin, startDate, endDate);

        res.status(200).send(orders);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/cashier/:orderId",
    authMiddleware.restaurantCashier(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const order = await orderControllers.getRestaurantOrderById(req.auth, req.params.orderId);

        res.status(200).send(order);
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    "/cashier/:orderId",
    authMiddleware.restaurantCashier(orderControllers.authRepository),
    async (req, res, next) => {
      const { orderId } = req.params;
      const { statusId } = req.body;
      try {
        const updatedOrder = await orderControllers.updateOrderStatus(
          req.auth,
          orderId,
          statusId
        );

        res.status(200).send(updatedOrder);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/user",
    authMiddleware.user(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const orders = await orderControllers.getAllUserOrders(req.auth._id);

        res.status(200).send(orders);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/user/:orderId",
    authMiddleware.user(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const order = await orderControllers.getUserOrderById(req.auth._id, req.params.orderId);

        res.status(200).send(order);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/:restaurantId/user",
    authMiddleware.user(orderControllers.authRepository),
    async (req, res, next) => {
      try {
        const newOrder = await orderControllers.createNewOrder(
          req.body,
          req.auth._id
        );

        res.status(201).send(newOrder);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = orderRouter;
