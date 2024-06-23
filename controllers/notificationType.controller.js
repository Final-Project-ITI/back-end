class NotificationTypeController {
    notificationTypeRepository
    authRepository;

    constructor(_notificationTypeRepository, _authRepository) {
        this.notificationTypeRepository = _notificationTypeRepository;
        this.authRepository = _authRepository;
    }

    async getAllNotificationTypes() {
        return await this.notificationTypeRepository.getAllNotificationTypes();
    }

    async createNotificationType(body) {
        return await this.notificationTypeRepository.createNotificationType(body);
    }
}

module.exports = NotificationTypeController;