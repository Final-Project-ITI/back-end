const express = require('express')
const orderRouter = express.Router();

orderRouter.get('/authorization', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.get('/admin', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.get('/admin/:orderId', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.get('/user', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.get('/user/:orderId', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.post('/:restaurantId/user', (req, res) => {
    res.send("Hello World From Orders")
})

orderRouter.patch('/cashier/:orderId', (req, res) => {
    res.send("Hello World From Orders")
})

module.exports = orderRouter;