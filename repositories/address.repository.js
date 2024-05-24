const AddressModel = require("../models/address.model");
var ObjectId = require("mongoose").Types.ObjectId;

class AddressRepository {
    constructor() { }

    async getUserAddresses(userId) {
        return await AddressModel.find({ userId }).populate('userId');
    }

    async getUserAddressById(userId, _id) {
        return await AddressModel.findOne({ _id, userId: new ObjectId(userId) }).populate('userId');
    }

    async updateUserAddressById(userId, _id, val) {
        return await AddressModel.updateMany({ _id, userId: new ObjectId(userId) }, val);
    }

    async createUserAddress(phoneInfo) {
        return await AddressModel.create(phoneInfo);
    }

    async deleteUserAddress(userId, _id) {
        return await AddressModel.deleteOne({ _id, userId: new ObjectId(userId) });
    }

}


module.exports = AddressRepository;