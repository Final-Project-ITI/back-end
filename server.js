const express = require('express')
const database = require("./database/database");

const app = express();
const port = 3000;
const mainRouter = express.Router();
const orderRouter = require('./routes/orders.router');

database();

mainRouter.use('/orders', orderRouter);

app.use('/api/v1/', mainRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})