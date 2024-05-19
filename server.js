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

const AuthRepository = require("./repositories/auth.repository.js");
const CartRepository = require("./repositories/cart.repository.js");
const ItemRepository = require("./repositories/item.repository.js");
const RestaurantRepository = require("./repositories/restaurant.repository.js");
const OrderRepository = require("./repositories/orders.repository.js");
const ProductRepository = require("./repositories/product.repository.js");
const PhoneRepository = require("./repositories/phone.repository.js");

const authRepository = new AuthRepository();
const restaurantRepository = new RestaurantRepository();
const cartRepository = new CartRepository();
const itemRepository = new ItemRepository();
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const phoneRepository = new PhoneRepository();

const AuthController = require("./controllers/auth.controller.js");
const RestaurantController = require("./controllers/restaurant.controller.js");
const CartController = require("./controllers/cart.controller.js");
const OrderController = require("./controllers/orders.controller");
const ProductController = require("./controllers/product.controller");
const PhoneController = require("./controllers/phone.controller");

const authController = new AuthController(authRepository);
const restaurantController = new RestaurantController(restaurantRepository, authRepository);
const cartController = new CartController(cartRepository, itemRepository, productRepository, authRepository);
const orderController = new OrderController(orderRepository, cartRepository, itemRepository, phoneRepository, authRepository, restaurantRepository);
const productController = new ProductController(productRepository, restaurantRepository, authRepository);
const phoneController = new PhoneController(phoneRepository, authRepository);

const AuthMiddleware = require("./middlewares/auth.middleware");

const authMiddleware = new AuthMiddleware(authRepository);

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
