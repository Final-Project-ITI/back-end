const Errors = require("../error/error");
const validateCategory = require("../validators/menuCategory.validator");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

class NotificationController {
    notificationRepository;
    notificationTypeRepository
    authRepository;

    constructor(_notificationRepository, _notificationTypeRepository, _authRepository) {
        this.notificationRepository = _notificationRepository;
        this.notificationTypeRepository = _notificationTypeRepository;
        this.authRepository = _authRepository;
    }

    async getAllUserNotification(userId) {
        return await this.notificationRepository.getAllUserNotification(userId);
    }

    async getAllUserNotificationById(_id, userId) {
        return await this.notificationRepository.getAllUserNotificationById(_id, userId);
    }

    async createUserNotification(body) {
        const notificationType = await this.notificationTypeRepository.createNotificationType({
            name: body.name,
            restaurantIcon: body.restaurantIcon
        })

        body.notificationType = notificationType._id;

        return await this.notificationRepository.createUserNotification(body);
    }


    async updateUserNotification(ids) {
        const currentDate = new Date();

        return await this.notificationRepository.updateUserNotification(ids, { seenAt: currentDate });
    }
}

module.exports = NotificationController;