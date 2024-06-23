const { options } = require("joi");
const UserModel = require("../models/user.model");
var ObjectId = require("mongoose").Types.ObjectId;

class UserRepository {
    async getUser(userId) {
        return await UserModel.findOne({ _id: userId }).populate("restaurantId");
    }

    async updateUser(userId, val) {
        return await UserModel.updateOne({ _id: userId }, val);
    }

    async getRestaurantsAdmins() {
        const admins = await UserModel.find({ typeId: new ObjectId("663e9b24a2ede177e6885e45") }).populate("restaurantId");

        return admins;
    }

    async getRestaurantCashiers(restaurantId) {
        return await UserModel.find({ restaurantId, typeId: new ObjectId("664fc05da9a0560d2742da1b") });
    }
}

module.exports = UserRepository;
