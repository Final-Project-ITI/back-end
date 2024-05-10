const express = require("express");

const app = express();
const mainRouter = express.Router();

const port = 3000;

const database = require("./database/database");
database();

const cartRouter = require("./routes/cart.js");
const restaurantRouter = require("./routes/restaurant.js");

const CartService = require("./services/cart.js");
const RestaurantService = require("./services/restaurant.js");

const cartService = new CartService();
const restaurantService = new RestaurantService();

const RestaurantController = require("./controllers/restaurant.js");
const CartController = require("./controllers/cart.js");

const restaurantController = new RestaurantController(restaurantService);
const cartController = new CartController(cartService);

mainRouter.use("/api/v1/cart", cartRouter(cartController));
mainRouter.use("/api/v1/restaurant", restaurantRouter(restaurantController));

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
