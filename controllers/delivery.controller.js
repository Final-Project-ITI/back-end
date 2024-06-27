const Errors = require("../error/error");

class DeliveryController {
    deliveryRepository;
    orderRepository;
    deliveryManRepository;
    authRepository;
    itemRepository;
    notificationRepository;

    constructor(
        _deliveryRepository,
        _deliveryManRepository,
        _orderRepository,
        _authRepository,
        _itemRepository,
        _notificationRepository
    ) {
        this.deliveryRepository = _deliveryRepository;
        this.orderRepository = _orderRepository;
        this.deliveryManRepository = _deliveryManRepository;
        this.authRepository = _authRepository;
        this.itemRepository = _itemRepository;
        this.notificationRepository = _notificationRepository
    }

    async createDelivery(orderId, deliveryInfo) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new Errors.ApiError("order not found", 400);
        }
        return this.deliveryRepository.createDelivery({ orderId });
    }
    async getAllDeliveries() {
        return await this.deliveryRepository.getAllDeliveries();
    }
    async getDelivery(_id) {
        const delivery = await this.deliveryRepository.getDelivery({ _id });
        const items = await this.itemRepository.getUserItemById({
            orderId: delivery.orderId._id,
        });
        return { delivery, items };
    }
    async acceptDelivery(orderId, deliveryManId, info) {
        const delivery = await this.deliveryRepository.getDelivery({ orderId });
        if (!delivery) {
            throw new Errors.ApiError("delivery not found", 400);
        }
        if (delivery.deliveryManId) {
            throw new Errors.ApiError("already accepted", 400);
        }

        console.log(delivery)

        await this.deliveryManRepository.updateDeliveryMan(
            { _id: deliveryManId },
            { currentlyDeliver: delivery._id }
        );

        await this.notificationRepository.deleteNotification(orderId)

        return await this.deliveryRepository.updateDelivery(
            { _id: delivery._id },
            { assignedAt: Date.now(), deliveryManId }
        );
    }
    async updateDelivery(_id, deliveryManId, info) {
        const delivery = await this.deliveryRepository.getDelivery({ _id });
        if (!delivery) {
            throw new Errors.ApiError("delivery not found", 400);
        }
        if (delivery.deliveryManId !== deliveryManId) {
            throw new Errors.UnAuthError();
        }
        if (delivery.deliverdAt) {
            throw new Errors.ApiError("already deliverd", 400);
        }

        const order = await this.orderRepository.updateOrder(
            { _id: delivery.orderId._id },
            { paymentStatus: "667ae98424daa8cfea1cb7fc" }
        );
        await this.deliveryManRepository.updateDeliveryMan(
            { _id: deliveryManId },
            { $pull: { 'currentlyDeliver': { _id: delivery.orderId._id } } }
        );

        return await this.deliveryRepository.updateDelivery(
            { _id },
            { deliverdAt: Date.now() }
        );
    }



    async getDeliverManDeliveries(val) {
        try {
            let deliveryManId;

            if (val.userId) {
                deliveryManId = (await this.deliveryManRepository.getDeliveryMan(val))._id;
            } else {
                deliveryManId = val.deliveryManId;
            }

            const deliveries = await this.deliveryRepository.getDeliveries({ deliveryManId });
            const items = await this.itemRepository.getAllItemsWithRes();

            const updatedDeliveries = deliveries.map((delivery) => {
                const ditems = items.filter(
                    (item) => {
                        return item.orderId?._id.toString() === delivery.orderId._id.toString()
                    }
                );
                const total = ditems.reduce(
                    (acc, item) => acc + item.quantity * item.productId.price,
                    0
                );
                return {
                    _id: delivery._id,
                    orderId: delivery.orderId,
                    items: ditems,
                    restaurant: ditems[0].productId.restaurantId,
                    assignedAt: delivery.assignedAt,
                    deliverdAt: delivery.deliverdAt,
                    total,
                };
            });

            return updatedDeliveries;
        } catch (error) {
            console.log(error)
        }
    }

    async getDeliveryManCurrentDeliveries(deliveryManId) {
        const deliveryMan = await this.deliveryManRepository.getDeliveryMan({
            _id: deliveryManId,
        });
        const deliveries = deliveryMan.currentlyDeliver;
        const items = await this.itemRepository.getAllItemsWithRes();

        const updatedDeliveries = deliveries.map((delivery) => {
            const ditems = items.filter(
                (item) => item.orderId.toString() === delivery.orderId._id.toString()
            );
            const total = ditems.reduce(
                (acc, item) => acc + item.quantity * item.productId.price,
                0
            );
            return {
                _id: delivery._id,
                orderId: delivery.orderId,
                items: ditems,
                restaurant: ditems[0].productId.restaurantId,
                assignedAt: delivery.assignedAt,
                deliverdAt: delivery.deliverdAt,
                total,
            };
        });

        return updatedDeliveries;
    }
}

module.exports = DeliveryController;
