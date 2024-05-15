const ItemModel = require("../models/item.model");

class ItemService {
    constructor() { }

    async getAllUserItems() {
        try {
            return await ItemModel.find();
        } catch (error) {
            return error;
        }
    }

    async getUserItemById(id) {
        try {
            return await ItemModel.findOne(id);
        } catch (error) {
            return error;
        }
    }

    async updateAllUserItems(id, val) {
        try {
            return await ItemModel.updateMany(id, val);
        } catch (error) {
            return error;
        }
    }

    async updateUserItemById(id, val) {
        try {
            return await ItemModel.updateOne(id, val);
        } catch (error) {
            return error;
        }
    }

    async deleteAllUserItem(id) {
        try {
            return await ItemModel.deleteMany(id);
        } catch (error) {
            return error;
        }
    }

    async deleteUserItemById(id) {
        try {
            return await ItemModel.deleteOne(id);
        } catch (error) {
            return error;
        }
    }

    async createItem(itemInfo) {
        try {
            return await ItemModel.create(itemInfo);
        } catch (error) {
            return error;
        }
    }
}

module.exports = ItemService;