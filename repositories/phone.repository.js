const PhoneModel = require("../models/phone.model");
var ObjectId = require("mongoose").Types.ObjectId;

class CartRepository {
    constructor() { }

    async getUserPhoneNumbers(userId) {
        return await PhoneModel.find({ userId }).populate('userId');
    }

    async getUserPhoneNumberById(userId, _id) {
        return await PhoneModel.findOne({ _id, userId: new ObjectId(userId) }).populate('userId');
    }

    async updateUserPhoneNumberById(userId, _id, val) {
        return await PhoneModel.updateMany({ _id, userId: new ObjectId(userId) }, val);
    }

    async createUserPhoneNumber(phoneInfo) {
        return await PhoneModel.create(phoneInfo);
    }

    async deleteUserPhoneNumber(userId, _id) {
        return await PhoneModel.deleteOne({ _id, userId: new ObjectId(userId) });
    }

}


module.exports = CartRepository;