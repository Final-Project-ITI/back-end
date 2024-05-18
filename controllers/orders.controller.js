class OrderController {
    orderServices;
    cartService;
    itemService;
    phoneService;
    authService;
    restaurantService;

    constructor(_orderServices, _cartService, _itemService, _phoneService, _authService,_restaurantService) {
        this.orderServices = _orderServices;
        this.cartService = _cartService;
        this.itemService = _itemService;
        this.phoneService = _phoneService;
        this.authService = _authService;
        this.restaurantService=_restaurantService;
    }

    getAllOrders() {
        return this.orderServices.getAllOrders()
    }

    async getAllRestaurantOrders(restaurantAdmin) {
        const restaurant=  await this.restaurantService.getRestaurantByAdminId(restaurantAdmin.restaurantId)
        return this.orderServices.getAllRestaurantOrders(restaurant._id)
    }

    getRestaurantOrderById() {
        return this.orderServices.getRestaurantOrderById()
    }

    getAllUserOrders() {
        return this.orderServices.getAllUserOrders()
    }

    getUserOrderById() {
        return this.orderServices.getUserOrderById()
    }

    async createNewOrder({ phoneId }, userId, restaurantId) {
        const phone = await this.phoneService.getUserPhoneNumberById(phoneId);

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

        const cart = await this.cartService.getUserCart(userId);

        if (!cart) {
            return {
                statusCode: 404,
                data: { message: "cart is empty" }
            }
        }

        const order = await this.orderServices.createNewOrder(orderInfo);

        cart.itemsIds.forEach(async (item) => {
            await this.itemService.updateUserItemById({ _id: item._id }, { orderId: order._id });
        })

        await this.cartService.deleteUserCart(userId);

        return {
            statusCode: 201,
            data: { message: "order placed successfuly" }
        }
    }

    updateOrderStatus() {
        return this.orderServices.updateOrderStatus()
    }
}

module.exports = OrderController;