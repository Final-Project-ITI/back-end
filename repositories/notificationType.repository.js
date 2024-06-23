const NotificationTypeModel = require("../models/notificationType.model");

class NotificationTypeRepository {
    async getAllNotificationTypes() {
        return await NotificationTypeModel.find();
    }

    async createNotificationType(body) {
        return await NotificationTypeModel.create(body);
    }
}

module.exports = NotificationTypeRepository;
