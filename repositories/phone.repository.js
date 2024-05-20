const PhoneModel = require("../models/phone.model");

class CartService {
    constructor() { }

    async getUserPhoneNumbers(userId) {
        try {
            return await PhoneModel.find({ userId }).populate('userId');
        } catch (error) {
            return error;
        }
    }

    async getUserPhoneNumberById(_id) {
        try {
            return await PhoneModel.findOne({ _id }).populate('userId');
        } catch (error) {
            return error;
        }
    }

    async updateUserPhoneNumberById(_id, val) {
        try {
            return await PhoneModel.updateMany({ _id }, val);
        } catch (error) {
            return error;
        }
    }

    async createUserPhoneNumber(phoneInfo) {
        try {
            return await PhoneModel.create(phoneInfo);
        } catch (error) {
            console.log(error.message)
            return error;
        }
    }

    async deleteUserPhoneNumber(_id) {
        try {
            return await PhoneModel.deleteOne({ _id });
        } catch (error) {
            return error;
        }
    }

}


module.exports = CartService;