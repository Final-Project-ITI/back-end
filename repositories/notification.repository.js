const NotificationModel = require("../models/notification.model");
var ObjectId = require("mongoose").Types.ObjectId;

class notificationRepository {
    constructor() { }

    async getAllUserNotification(userId) {
        return await NotificationModel.find({ userId }).populate("notificationType").sort({ createdAt: -1 });
    }

    async getAllUserNotificationById(_id, userId) {
        return await NotificationModel.findOne({ _id, userId }).populate("notificationType");
    }

    async getAllDeliveryNotification() {
        return await NotificationModel.find({ userId: null }).populate("notificationType");
    }

    async deleteNotification(orderId) {
        return await NotificationModel.deleteOne({ orderId });
    }

    async createUserNotification(body) {
        return await NotificationModel.create(body);
    }

    async updateUserNotification(ids, val) {
        return await NotificationModel.updateMany({ _id: { $in: ids }, }, val);
    }
}

module.exports = notificationRepository;