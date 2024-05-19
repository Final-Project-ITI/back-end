const ApiError = require("../utils/error");
const OrderModel = require("../models/order.model");

class OrderService {
  orderRepository;
  cartRepository;
  itemRepository;
  phoneRepository;
  authRepository;
  restaurantRepository;

  constructor(
    _orderRepository,
    _cartRepository,
    _itemRepository,
    _phoneRepository,
    _authRepository,
    _restaurantRepository
  ) {
    this.orderRepository = _orderRepository;
    this.cartRepository = _cartRepository;
    this.itemRepository = _itemRepository;
    this.phoneRepository = _phoneRepository;
    this.authRepository = _authRepository;
    this.restaurantRepository = _restaurantRepository;
  }
  async getAllOrders() {
    const orders = await this.orderRepository.getAllOrders();
    this.respones = {
      statusCode: 200,
      data: orders,
    };
    return this.respones;
  }

  async getAllRestaurantOrders(restaurantAdmin) {
    const orders = await this.orderRepository.getAllRestaurantOrders(
      restaurantAdmin.restaurantId
    );
    this.respones = {
      statusCode: 200,
      data: orders,
    };
    return this.respones;
  }

  async getAllUserOrders(userId) {
    try {
      const userOrders = await this.orderRepository.getAllUserOrders(userId);
      if (!userOrders || userOrders.length === 0) {
        return { statusCode: 404, data: { message: "user Orders not found" } };
      }
      return { statusCode: 200, data: userOrders };
    } catch (error) {
      console.error("Error fetching Orders:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }

  async getUserOrderById(userId, orderId) {
    try {
      const order = await this.orderRepository.getUserOrderById(
        userId,
        orderId
      );
      if (!order) {
        return { statusCode: 404, data: { message: "Order not found" } };
      }
      return { statusCode: 200, data: order };
    } catch (error) {
      console.error("Error fetching user Order:", error);
      return { statusCode: 500, data: { message: "Internal server error" } };
    }
  }

  async createNewOrder({ phoneId }, userId, restaurantId) {
    const phone = await this.phoneRepository.getUserPhoneNumberById(phoneId);

    if (!phone) {
      return {
        statusCode: 404,
        data: { message: "can't find phone number" },
      };
    }

    const orderInfo = {
      phoneId,
      statusId: "6646747dd96fa5f4ee9cacd8",
    };

    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      return {
        statusCode: 404,
        data: { message: "cart is empty" },
      };
    }

    const order = await this.orderRepository.createNewOrder(orderInfo);

    cart.itemsIds.forEach(async (item) => {
      await this.itemRepository.updateUserItemById(
        { _id: item._id },
        { orderId: order._id }
      );
    });

    await this.cartRepository.deleteUserCart(userId);

    return {
      statusCode: 201,
      data: { message: "order placed successfuly" },
    };
  }

  async getRestaurantOrderById(orderId) {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (error) {
      throw new ApiError("Error retrieving order", 400);
    }
  }
  async updateOrderStatus(orderId, status) {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw new ApiError("Error updating order status", 400);
    }
  }
}

module.exports = OrderService;
