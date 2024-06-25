const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    notificationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NotificationType",
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    seenAt: {
        type: Date,
        default: null,
    },
});

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;