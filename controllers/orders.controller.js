class OrderControllers {
    orderServices;

    constructor(_orderServices) {
        this.orderServices = _orderServices;
    }

    getAllOrders() {
        return this.orderServices.getAllOrders()
    }

    getAllRestaurantOrders() {
        return this.orderServices.getAllRestaurantOrders()
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

    createNewOrder() {
        return this.orderServices.createNewOrder()

    }

    updateOrderStatus() {
        return this.orderServices.updateOrderStatus()
    }
}

module.exports = OrderControllers;