const mongoose = require("mongoose");

const notificationTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restaurantIcon: {
        type: String,
        default: null
    },
});

const NotificationTypeModel = mongoose.model("NotificationType", notificationTypeSchema);
module.exports = NotificationTypeModel;
