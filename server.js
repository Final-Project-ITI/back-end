const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

const http = require('http');
const server = http.createServer(app);

const { instrument } = require("@socket.io/admin-ui")

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true // Allow credentials
  }
});

const mainRouter = express.Router();
const port = process.env.PORT;

const firebaseConfig = require("./config/firebase.config.js");
const { initializeApp } = require("firebase/app");

initializeApp(firebaseConfig);

/* Connect To Database */

const database = require("./database/database");

database();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://admin.socket.io"], // React app's port and admin UI
  credentials: true // Allow credentials
}));

/* Routers */

const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const cartRouter = require("./routes/cart.router.js");
const restaurantRouter = require("./routes/restaurant.router.js");
const orderRouter = require("./routes/orders.router.js");
const orderStatusRouter = require("./routes/orderStatus.router.js");
const productRouter = require("./routes/product.router.js");
const phoneRouter = require("./routes/phone.router.js");
const addressRouter = require("./routes/address.router.js");
const menuCategoryRouter = require("./routes/menuCategory.router.js");
const ingredientRouter = require("./routes/ingredient.router.js");
const notificationTypeRouter = require("./routes/notificationType.router.js");
const notificationRouter = require("./routes/notification.router.js");
const deliveryRouter = require("./routes/delivery.router.js");
const deliveryManRouter = require("./routes/deliveryMan.router.js");

/* Repositories */

const AuthRepository = require("./repositories/auth.repository.js");
const UserRepository = require("./repositories/user.repository.js");
const CartRepository = require("./repositories/cart.repository.js");
const ItemRepository = require("./repositories/item.repository.js");
const RestaurantRepository = require("./repositories/restaurant.repository.js");
const OrderRepository = require("./repositories/orders.repository.js");
const OrderStatusRepository = require("./repositories/orderStatus.repository.js");
const ProductRepository = require("./repositories/product.repository.js");
const PhoneRepository = require("./repositories/phone.repository.js");
const AddressRepository = require("./repositories/address.repository.js");
const MenuCategoryRepository = require("./repositories/menuCategory.repository.js");
const IngredientRepository = require("./repositories/ingredient.repository.js");
const NotificationTypeRepository = require("./repositories/notificationType.repository.js");
const NotificationRepository = require("./repositories/notification.repository.js");
const DeliveryRepository = require("./repositories/delivery.repository.js")
const DeliveryManRepository = require("./repositories/deliveryMan.repository.js")

/* Controllers */

const AuthController = require("./controllers/auth.controller.js");
const UserController = require("./controllers/user.controller.js");
const RestaurantController = require("./controllers/restaurant.controller.js");
const CartController = require("./controllers/cart.controller.js");
const OrderController = require("./controllers/orders.controller");
const OrderStatusController = require("./controllers/orderStatus.controller");
const ProductController = require("./controllers/product.controller");
const PhoneController = require("./controllers/phone.controller");
const AddressController = require("./controllers/address.controller");
const MenuCategoryController = require("./controllers/menuCategory.controller");
const IngredientController = require("./controllers/ingredient.controller");
const NotificationTypeController = require("./controllers/notificationType.controller");
const NotificationController = require("./controllers/notification.controller");
const DeliveryController = require("./controllers/delivery.controller.js");
const DeliveryManController = require("./controllers/deliveryMan.controller.js");

/* Middlewares */

const AuthMiddleware = require("./middlewares/auth.middleware");
const PaginationMiddleware = require("./middlewares/pagination.middleware");
const MulterMiddleware = require("./middlewares/multer.middleware");
const errorMiddleware = require('./middlewares/error.middleware.js');

/* Repositories Instances */

const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const restaurantRepository = new RestaurantRepository();
const cartRepository = new CartRepository();
const itemRepository = new ItemRepository();
const orderRepository = new OrderRepository();
const orderStatusRepository = new OrderStatusRepository();
const productRepository = new ProductRepository();
const phoneRepository = new PhoneRepository();
const addressRepository = new AddressRepository();
const menuCategoryRepository = new MenuCategoryRepository();
const ingredientRepository = new IngredientRepository();
const notificationTypeRepository = new NotificationTypeRepository();
const notificationRepository = new NotificationRepository();
const deliveryRepository = new DeliveryRepository();
const deliveryManRepository = new DeliveryManRepository();

/* Controllers Instances */

const authController = new AuthController(authRepository);
const userController = new UserController(userRepository, authRepository);
const notificationTypeController = new NotificationTypeController(notificationTypeRepository, authRepository);
const notificationController = new NotificationController(notificationRepository, notificationTypeRepository, authRepository);
const restaurantController = new RestaurantController(restaurantRepository, authRepository);
const cartController = new CartController(cartRepository, itemRepository, productRepository, authRepository);
const orderController = new OrderController(orderRepository, cartRepository, itemRepository, phoneRepository, authRepository, restaurantRepository, notificationController);
const orderStatusController = new OrderStatusController(orderStatusRepository);
const productController = new ProductController(productRepository, restaurantRepository, authRepository, menuCategoryRepository, ingredientRepository);
const phoneController = new PhoneController(phoneRepository, authRepository);
const addressController = new AddressController(addressRepository, authRepository);
const menuCategoryController = new MenuCategoryController(menuCategoryRepository, authRepository);
const ingredientController = new IngredientController(ingredientRepository, authRepository);
const deliveryController = new DeliveryController(deliveryRepository, deliveryManRepository, orderRepository)
const deliveryManController = new DeliveryManController(deliveryManRepository, authRepository)

/* Middlewares Instances */

const authMiddleware = new AuthMiddleware(authRepository);
const paginationMiddleware = new PaginationMiddleware();
const multerMiddleware = new MulterMiddleware();

/* --------------------- */

mainRouter.use("/user", userRouter(userController, authMiddleware, paginationMiddleware));
mainRouter.use("/cart", cartRouter(cartController, authMiddleware));
mainRouter.use("/restaurant", restaurantRouter(restaurantController, authMiddleware, multerMiddleware));
mainRouter.use("/authentication", authRouter(authController, authMiddleware));
mainRouter.use("/orders", orderRouter(orderController, authMiddleware));
mainRouter.use("/orderStatuses", orderStatusRouter(orderStatusController));
mainRouter.use("/products", productRouter(productController, authMiddleware, multerMiddleware, paginationMiddleware));
mainRouter.use("/phones", phoneRouter(phoneController, authMiddleware));
mainRouter.use("/addresses", addressRouter(addressController, authMiddleware));
mainRouter.use("/categories", menuCategoryRouter(menuCategoryController, authMiddleware, multerMiddleware, paginationMiddleware));
mainRouter.use("/ingredients", ingredientRouter(ingredientController, authMiddleware, multerMiddleware, paginationMiddleware));
mainRouter.use("/notificationType", notificationTypeRouter(notificationTypeController, authMiddleware));
mainRouter.use("/notification", notificationRouter(notificationController, authMiddleware));
mainRouter.use("/delivery", deliveryRouter(deliveryController, authMiddleware))
mainRouter.use("/deliveryman", deliveryManRouter(deliveryManController, authMiddleware))

/* --------------------- */

app.use("/api/v1", mainRouter);

app.use(errorMiddleware);

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  /* Events */
  socket.on("new-order-req", (room) => {
    if (room) {
      socket.to(room).emit("new-order-res");
    }
  });

  socket.on("change-order-status", (room, notificationId) => {
    if (room) {
      socket.to(room).emit("notify-user", notificationId);
    }
  });

  /* Join Rooms */
  socket.on("join-room", room => {
    socket.join(room)
  })
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

instrument(io, { auth: false });