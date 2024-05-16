const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const orderRouter = (orderControllers, authMiddleware) => {
    router.get('/authorization', (req, res) => {
        const response = orderControllers.getAllOrders();

        res.send(response)
    })

    router.get('/admin', (req, res) => {
        const response = orderControllers.getAllRestaurantOrders();

        res.send(response)
    })

    router.get('/admin/:orderId', (req, res) => {
        const response = orderControllers.getRestaurantOrderById();

        res.send(response)
    })

    router.get('/user', (req, res) => {
        const response = orderControllers.getAllUserOrders();

        res.send(response)
    })

    router.get('/user/:orderId', (req, res) => {
        const response = orderControllers.getUserOrderById();

        res.send(response)
    })

    router.post(
        '/:restaurantId/user',
        authMiddleware.user(orderControllers.authService),
        asyncHandler(async (req, res) => {
            const response = await orderControllers.createNewOrder(req.body, req.auth._id, req.params.restaurantId);

            res.status(response.statusCode).send(response.data)
        }))

    router.patch('/cashier/:orderId', (req, res) => {
        const response = orderControllers.updateOrderStatus();

        res.send(response)
    })

    return router;
}

module.exports = orderRouter;