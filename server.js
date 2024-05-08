const express = require('express')
const database = require("./database/database");

const app = express();
const port = 3000;
const mainRouter = express.Router();

const orderRouter = require('./routes/orders.router');
const OrderControllers = require('./controllers/orders.controller');
const OrderServices = require('./services/orders.service');

database();

mainRouter.use('/orders', orderRouter(new OrderControllers(new OrderServices)));

app.use('/api/v1/', mainRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})