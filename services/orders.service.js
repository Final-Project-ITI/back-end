const ItemModel = require("../models/item.model");
const OrderModel = require("../models/order.model");
const OrderStatusModel = require("../models/orderStatus.model");

class OrderService {
    constructor() { }

    async getAllOrders() {
        return await OrderModel.find();
    }

    async getAllRestaurantOrders(resId) {
        const items= ItemModel.find().populate("productId");
        const filteredItems= items.filter((item)=>item.productId.restaurantId===resId)
        let orders=filteredItems.map((items)=>items.orderId)
        orders =set(...orders)

        return orders;
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