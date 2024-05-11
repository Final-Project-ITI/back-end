const express = require("express");

const app = express();
const mainRouter = express.Router();
app.use(express.json());

const port = 3000;

const database = require("./database/database");

database();

const cartRouter = require("./routes/cart.js");
const restaurantRouter = require("./routes/restaurant.js");
const orderRouter = require("./routes/orders.router.js");
const productRouter = require("./routes/product.router.js");

const CartService = require("./services/cart.js");
const RestaurantService = require("./services/restaurant.js");
const OrderService = require("./services/orders.service");
const ProductService = require("./services/product.service");

const restaurantService = new RestaurantService();
const cartService = new CartService();
const orderService = new OrderService();
const productService = new ProductService();

const RestaurantController = require("./controllers/restaurant.js");
const CartController = require("./controllers/cart.js");
const OrderController = require("./controllers/orders.controller");
const ProductController = require("./controllers/product.controller");

const restaurantController = new RestaurantController(restaurantService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);
const productController = new ProductController(productService);

mainRouter.use("/cart", cartRouter(cartController));
mainRouter.use("/restaurant", restaurantRouter(restaurantController));
mainRouter.use("/orders", orderRouter(orderController));
mainRouter.use("/products", productRouter(productController));

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
