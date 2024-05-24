const ItemModel = require("../models/item.model");

class ItemRepository {
    constructor() { }

    async getAllItems() {
        return await ItemModel.find().populate("productId");
    }

    async getUserItemById(id) {
        return await ItemModel.findOne(id);
    }

    async updateAllUserItems(id, val) {
        return await ItemModel.updateMany(id, val);
    }

    async updateUserItemById(id, val) {
        return await ItemModel.updateOne(id, val);
    }

    async deleteAllUserItem(id) {
        return await ItemModel.deleteMany(id);
    }

    async deleteUserItemById(id) {
        return await ItemModel.deleteOne(id);
    }

    async createItem(itemInfo) {
        return await ItemModel.create(itemInfo);
    }
}

module.exports = ItemRepository;