const express = require("express");

const app = express();
const mainRouter = express.Router();

const port = 3000;

const database = require("./database/database");

database();

const cartRouter = require("./routes/cart.js");
const restaurantRouter = require("./routes/restaurant.js");
const orderRouter = require('./routes/orders.router');

const CartService = require("./services/cart.js");
const RestaurantService = require("./services/restaurant.js");
const OrderService = require('./services/orders.service');

const restaurantService = new RestaurantService();
const cartService = new CartService();
const orderService = new OrderService();

const RestaurantController = require("./controllers/restaurant.js");
const CartController = require("./controllers/cart.js");
const OrderController = require('./controllers/orders.controller');


const restaurantController = new RestaurantController(restaurantService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);

mainRouter.use("/api/v1/cart", cartRouter(cartController));
mainRouter.use("/api/v1/restaurant", restaurantRouter(restaurantController));
mainRouter.use('/orders', orderRouter(orderController(orderService)));

app.use("/", mainRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
