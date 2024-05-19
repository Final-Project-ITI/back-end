class OrderController {
    orderRepository;
    cartRepository;
    itemRepository;
    phoneRepository;
    authRepository;
    restaurantRepository;

    constructor(_orderRepository, _cartRepository, _itemRepository, _phoneRepository, _authRepository, _restaurantRepository) {
        this.orderRepository = _orderRepository;
        this.cartRepository = _cartRepository;
        this.itemRepository = _itemRepository;
        this.phoneRepository = _phoneRepository;
        this.authRepository = _authRepository;
        this.restaurantRepository = _restaurantRepository;
    }

    async getAllOrders() {
        const orders = await this.orderRepository.getAllOrders()
        this.respones = {
            statusCode: 200,
            data: orders
        }
        return this.respones;
    }

    async getAllRestaurantOrders(restaurantAdmin) {
        const orders = await this.orderRepository.getAllRestaurantOrders(restaurantAdmin.restaurantId)
        this.respones = {
            statusCode: 200,
            data: orders
        }
        return this.respones;
    }

    getRestaurantOrderById() {
        return this.orderRepository.getRestaurantOrderById()
    }

    getAllUserOrders() {
        return this.orderRepository.getAllUserOrders()
    }

    getUserOrderById() {
        return this.orderRepository.getUserOrderById()
    }

    async createNewOrder({ phoneId }, userId, restaurantId) {
        const phone = await this.phoneRepository.getUserPhoneNumberById(phoneId);

        if (!phone) {
            return {
                statusCode: 404,
                data: { message: "can't find phone number" }
            }
        }

        const orderInfo = {
            phoneId,
            statusId: "6646747dd96fa5f4ee9cacd8",
        }

        const cart = await this.cartRepository.getUserCart(userId);

        if (!cart) {
            return {
                statusCode: 404,
                data: { message: "cart is empty" }
            }
        }

        const order = await this.orderRepository.createNewOrder(orderInfo);

        cart.itemsIds.forEach(async (item) => {
            await this.itemRepository.updateUserItemById({ _id: item._id }, { orderId: order._id });
        })

        await this.cartRepository.deleteUserCart(userId);

        return {
            statusCode: 201,
            data: { message: "order placed successfuly" }
        }
    }

    updateOrderStatus() {
        return this.orderRepository.updateOrderStatus()
    }
}

module.exports = OrderController;