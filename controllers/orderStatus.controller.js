const Errors = require("../error/error");
class OrderStatusController {
    orderStatusRepository;

    constructor(_orderStatusRepository) {
        this.orderStatusRepository = _orderStatusRepository;
    }

    async getAllOrderStatuses() {
        return await this.orderStatusRepository.getAllOrderStatuses();
    }
}

module.exports = OrderStatusController;
