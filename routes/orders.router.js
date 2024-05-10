const express = require('express');
const router = express.Router();

const orderRouter = (orderControllers) => {
    router.get('/authorization', (req, res) => {
        const respone = orderControllers.getAllOrders();

        res.send(respone)
    })

    router.get('/admin', (req, res) => {
        const respone = orderControllers.getAllRestaurantOrders();

        res.send(respone)
    })

    router.get('/admin/:orderId', (req, res) => {
        const respone = orderControllers.getRestaurantOrderById();

        res.send(respone)
    })

    router.get('/user', (req, res) => {
        const respone = orderControllers.getAllUserOrders();

        res.send(respone)
    })

    router.get('/user/:orderId', (req, res) => {
        const respone = orderControllers.getUserOrderById();

        res.send(respone)
    })

    router.post('/:restaurantId/user', (req, res) => {
        const respone = orderControllers.createNewOrder();

        res.send(respone)
    })

    router.patch('/cashier/:orderId', (req, res) => {
        const respone = orderControllers.updateOrderStatus();

        res.send(respone)
    })

    return router;
}

module.exports = orderRouter;