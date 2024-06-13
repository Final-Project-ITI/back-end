const { options } = require("joi");
const UserModel = require("../models/user.model");
var ObjectId = require("mongoose").Types.ObjectId;

class UserRepository {
    async getUser(userId) {
        return await UserModel.findOne({ _id: userId }).populate("restaurantId");
    }

    async getRestaurantsAdmins({ startIndex, endIndex }) {
        const admins = await UserModel.find({ typeId: new ObjectId("663e9b24a2ede177e6885e45") }).populate("restaurantId");

        return admins.slice(startIndex, endIndex);
    }

    async getRestaurantCashiers(restaurantId) {
        return await UserModel.find({ restaurantId, typeId: new ObjectId("664fc05da9a0560d2742da1b") });
    }
}

module.exports = UserRepository;