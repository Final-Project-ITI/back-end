const express = require("express");

const bodyParser = require('body-parser')


const mainRouter = express.Router();
const app = express();
const port = 3000;

const database = require("./database/database");


database();
app.use(express.json());

const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.js");
const restaurantRouter = require("./routes/restaurant.js");
const orderRouter = require('./routes/orders.router');

const AuthService = require("./services/auth.service");
const CartService = require("./services/cart.js");
const RestaurantService = require("./services/restaurant.js");
const OrderService = require('./services/orders.service');

const authService = new AuthService();
const restaurantService = new RestaurantService();
const cartService = new CartService();
const orderService = new OrderService();

const AuthController = require("./controllers/auth.coteoller");
const RestaurantController = require("./controllers/restaurant.js");
const CartController = require("./controllers/cart.js");
const OrderController = require('./controllers/orders.controller');

const authCoteoller = new AuthController(authService);
const restaurantController = new RestaurantController(restaurantService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);

const AuthMiddleware = require("./middlewares/auth.middleware");
const authMiddleware = new AuthMiddleware();


mainRouter.use("/cart", cartRouter(cartController));
mainRouter.use("/restaurant", restaurantRouter(restaurantController));
mainRouter.use('/orders', orderRouter(orderController(orderService)));
mainRouter.use('/authentication', authRouter(authCoteoller, authMiddleware, authService));





app.use('/api/v1', mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
