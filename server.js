const express = require("express");
require("dotenv").config();

const cors = require("cors");

const mainRouter = express.Router();
const app = express();
const port = process.env.PORT;

/* Connect To Database */

const database = require("./database/database");

database();
app.use(express.json());
app.use(cors());

/* Routers */

const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router.js");
const restaurantRouter = require("./routes/restaurant.router.js");
const orderRouter = require("./routes/orders.router.js");
const productRouter = require("./routes/product.router.js");
const phoneRouter = require("./routes/phone.router.js");
const addressRouter = require("./routes/address.router.js");
const paymentRouter = require("./routes/payment.router.js");
const ingredientRouter = require("./routes/ingredient.router.js");

/* Repositories */

const AuthRepository = require("./repositories/auth.repository.js");
const CartRepository = require("./repositories/cart.repository.js");
const ItemRepository = require("./repositories/item.repository.js");
const RestaurantRepository = require("./repositories/restaurant.repository.js");
const OrderRepository = require("./repositories/orders.repository.js");
const ProductRepository = require("./repositories/product.repository.js");
const PhoneRepository = require("./repositories/phone.repository.js");
const AddressRepository = require("./repositories/address.repository.js");
const PaymentRepository = require("./repositories/payment.repository.js");
const IngredientRepository = require("./repositories/ingredient.repository.js");

/* Controllers */

const AuthController = require("./controllers/auth.controller.js");
const RestaurantController = require("./controllers/restaurant.controller.js");
const CartController = require("./controllers/cart.controller.js");
const OrderController = require("./controllers/orders.controller");
const ProductController = require("./controllers/product.controller");
const PhoneController = require("./controllers/phone.controller");
const AddressController = require("./controllers/address.controller");
const PaymentController = require("./controllers/payment.controller");
const IngredientController = require("./controllers/ingredient.controller");

/* Middlewares */

const AuthMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware.js");

/* Repositories Instances */

const authRepository = new AuthRepository();
const restaurantRepository = new RestaurantRepository();
const cartRepository = new CartRepository();
const itemRepository = new ItemRepository();
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const phoneRepository = new PhoneRepository();
const addressRepository = new AddressRepository();
const paymentRepository = new PaymentRepository();
const ingredientRepository = new IngredientRepository();

/* Controllers Instances */

const authController = new AuthController(authRepository);
const restaurantController = new RestaurantController(
  restaurantRepository,
  authRepository
);
const cartController = new CartController(
  cartRepository,
  itemRepository,
  productRepository,
  authRepository
);
const orderController = new OrderController(
  orderRepository,
  cartRepository,
  itemRepository,
  phoneRepository,
  authRepository,
  restaurantRepository
);
const productController = new ProductController(
  productRepository,
  restaurantRepository,
  authRepository
);
const phoneController = new PhoneController(phoneRepository, authRepository);
const addressController = new AddressController(
  addressRepository,
  authRepository
);
const paymentController = new PaymentController(
  paymentRepository,
  authRepository
);
const ingredientController = new IngredientController(
  ingredientRepository,
  authRepository
);

/* Middlewares Instances */

const authMiddleware = new AuthMiddleware(authRepository);

/* --------------------- */

mainRouter.use("/cart", cartRouter(cartController, authMiddleware));
mainRouter.use(
  "/restaurant",
  restaurantRouter(restaurantController, authMiddleware)
);
mainRouter.use("/authentication", authRouter(authController, authMiddleware));
mainRouter.use("/orders", orderRouter(orderController, authMiddleware));
mainRouter.use("/products", productRouter(productController, authMiddleware));
mainRouter.use("/phones", phoneRouter(phoneController, authMiddleware));
mainRouter.use("/addresses", addressRouter(addressController, authMiddleware));
mainRouter.use("/payments", paymentRouter(paymentController, authMiddleware));
mainRouter.use(
  "/ingredients",
  ingredientRouter(ingredientController, authMiddleware)
);

/* --------------------- */

app.use("/api/v1", mainRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
