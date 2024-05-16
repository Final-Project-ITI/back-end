const express = require("express");

const mainRouter = express.Router();
const app = express();
const port = 3000;

const database = require("./database/database");

database();
app.use(express.json());

const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router.js");
const restaurantRouter = require("./routes/restaurant.router.js");
const orderRouter = require("./routes/orders.router.js");
const productRouter = require("./routes/product.router.js");
const phoneRouter = require("./routes/phone.router.js");

const AuthService = require("./services/auth.service");
const CartService = require("./services/cart.service.js");
const ItemService = require("./services/item.service");
const RestaurantService = require("./services/restaurant.service.js");
const OrderService = require("./services/orders.service");
const ProductService = require("./services/product.service");
const PhoneService = require("./services/phone.service");

const authService = new AuthService();
const restaurantService = new RestaurantService();
const cartService = new CartService();
const itemService = new ItemService();
const orderService = new OrderService();
const productService = new ProductService();
const phoneService = new PhoneService();

const AuthController = require("./controllers/auth.controller.js");
const RestaurantController = require("./controllers/restaurant.controller.js");
const CartController = require("./controllers/cart.controller.js");
const OrderController = require("./controllers/orders.controller");
const ProductController = require("./controllers/product.controller");
const PhoneController = require("./controllers/phone.controller");

const authController = new AuthController(authService);
const restaurantController = new RestaurantController(restaurantService, authService);
const cartController = new CartController(cartService, itemService, productService, authService);
const orderController = new OrderController(orderService, cartService, itemService, phoneService, authService);
const productController = new ProductController(productService, restaurantService, authService);
const phoneController = new PhoneController(phoneService, authService);

const AuthMiddleware = require("./middlewares/auth.middleware");

const authMiddleware = new AuthMiddleware(authService);

mainRouter.use("/cart", cartRouter(cartController, authMiddleware));
mainRouter.use(
  "/restaurant",
  restaurantRouter(restaurantController, authMiddleware)
);
mainRouter.use("/orders", orderRouter(orderController, authMiddleware));
mainRouter.use("/authentication", authRouter(authController));
mainRouter.use("/products", productRouter(productController, authMiddleware));
mainRouter.use("/phones", phoneRouter(phoneController, authMiddleware));

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
