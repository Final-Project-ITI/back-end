const OrderModel = require("../models/order.model");
const OrderStatusModel = require("../models/orderStatus.model");

class OrderService {
    constructor() { }

    async getAllOrders() {
        return await OrderModel.find();
    }

    getAllRestaurantOrders(resId) {
        return "All Orders For The Restaurant Admin";
    }

    getRestaurantOrderById() {
        return "Order For The Restaurant Admin";
    }

    getAllUserOrders() {
        return "All Orders For The User";
    }

    getUserOrderById() {
        return "Order For The User";
    }

    async createNewOrder(orderInfo) {
        try {
            return await OrderModel.create(orderInfo);
        } catch (error) {
            return error;
        }
    }

    updateOrderStatus() {

    }
}

module.exports = OrderService;