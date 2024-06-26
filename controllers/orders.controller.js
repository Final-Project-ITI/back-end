const Errors = require("../error/error");

class OrderController {
  orderRepository;
  cartRepository;
  itemRepository;
  phoneRepository;
  authRepository;
  restaurantRepository;
  notificationRepository;
  deliveryRepository;
  addressRepository;

  constructor(
    _orderRepository,
    _cartRepository,
    _itemRepository,
    _phoneRepository,
    _authRepository,
    _restaurantRepository,
    _notificationRepository,
    _deliveryRepository,
    _addressRepository
  ) {
    this.orderRepository = _orderRepository;
    this.cartRepository = _cartRepository;
    this.itemRepository = _itemRepository;
    this.phoneRepository = _phoneRepository;
    this.authRepository = _authRepository;
    this.restaurantRepository = _restaurantRepository;
    this.notificationRepository = _notificationRepository;
    this.deliveryRepository = _deliveryRepository;
    this.addressRepository = _addressRepository;
  }

  async getAllOrders() {
    return await this.orderRepository.getAllOrders();
  }

  async getAllRestaurantOrders(restaurantCashier) {
    const items = await this.itemRepository.getAllItems();
    const filteredItems = items.filter((item) => item.productId.restaurantId.toString() === restaurantCashier.restaurantId.toString());
    const orderIds = filteredItems.map((items) => items.orderId);

    return { orders: await this.orderRepository.getAllRestaurantOrders(orderIds), items: filteredItems };
  }

  async getFilteredOrdersByDate(restaurantCashier, startDate, endDate) {
    const items = await this.itemRepository.getAllItems();
    const filteredItems = items.filter((item) =>
      item.productId.restaurantId.toString() === restaurantCashier.restaurantId.toString()
    );
    const orderIds = filteredItems.map((item) => item.orderId);

    return { orders: await this.orderRepository.getOrdersByIdsAndDateRange(orderIds, startDate, endDate), items: filteredItems };
  }

  async getRestaurantOrderById(restaurantCashier, orderId) {
    const items = await this.itemRepository.getAllItems();
    const filteredItems = items.filter((item) =>
      item.productId.restaurantId.toString() === restaurantCashier.restaurantId.toString()
    );
    const orderIds = filteredItems.map((item) => item.orderId.toString());

    if (!orderIds.includes(orderId)) {
      throw new Errors.UnAuthError("unauthorized user: you can't access others orders");
    }

    return await this.orderRepository.getOrderById(orderId);
  }

  async updateOrderStatus(restaurantCashier, orderId, statusId, userId) {
    /* Check if the status exist */

    const status = await this.orderRepository.getStatus(statusId);

    if (!status) {
      throw new Errors.NotFoundError("status not found");
    }

    /* Check if the order exist */

    const items = await this.itemRepository.getAllItems();

    const filteredItems = items.filter((item) =>
      item.productId.restaurantId.toString() === restaurantCashier.restaurantId.toString()
    );
    const orderIds = filteredItems.map((item) => item.orderId.toString());

    const restaurant = await this.restaurantRepository.getRestaurantById(restaurantCashier.restaurantId.toString());

    const notification = {
      name: status.status,
      orderId,
      userId,
      restaurantIcon: restaurant.icon
    }

    const notificationRes = await this.notificationRepository.createUserNotification(notification);

    if (!orderIds.includes(orderId)) {
      throw new Errors.UnAuthError("unauthorized user: you can't access others orders");
    }

    await this.orderRepository.updateOrderStatus(orderId, statusId);

    return notificationRes;
  }

  async getAllUserOrders(userId) {
    const orders = await this.orderRepository.getAllUserOrders(userId);
    const orderIds = orders.map((order) => order._id);

    const items = await this.itemRepository.getUserItemByOrderIds(orderIds);

    const filteredItems = items.filter((item) =>
      orderIds.includes(item.orderId.toString())
    );

    return { orders: orders, items };
  }

  async getUserOrderById(userId, orderId) {
    return await this.orderRepository.getUserOrderById(userId, orderId);
  }

  async createNewOrder({ phoneId, addressId }, userId) {
    if (!phoneId | addressId) {
      throw new Errors.NotFoundError("missing data");

    }
    const phone = await this.phoneRepository.getUserPhoneNumberById(userId, phoneId);

    if (!phone) {
      throw new Errors.NotFoundError("can't find phone number");
    }

    const address = await this.addressRepository.getUserAddressById(userId, addressId);

    if (!address) {
      throw new Errors.NotFoundError("can't find address");
    }

    const orderInfo = {
      phoneId,
      addressId,
      statusId: "6646747dd96fa5f4ee9cacd8",
      userId
    };

    const cart = await this.cartRepository.getUserCart(userId);

    if (!cart) {
      throw new Errors.NotFoundError("cart is empty");
    }

    const order = await this.orderRepository.createNewOrder(orderInfo);

    cart.itemsIds.forEach(async (item) => {
      await this.itemRepository.updateUserItemById(
        { _id: item._id },
        { orderId: order._id }
      );
    });

    await this.cartRepository.deleteUserCart(userId), await this.deliveryRepository.createDelivery({ orderId: order._id });

    return order;
  }
}

module.exports = OrderController;
