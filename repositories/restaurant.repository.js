const { options } = require("joi");
const RestaurantModel = require("../models/restaurant.model");

class RestaurantRepository {
  async getRestaurantsByName(name) {
    return await RestaurantModel.find({ name: { $regex: name, $options: "i" }, isDeleted: false });
  }

  async getRestaurantById(_id) {
    return await RestaurantModel.findOne({ _id, isDeleted: false });
  }

  async getAllRestaurants() {
    return await RestaurantModel.find({ isDeleted: false });
  }

  async addRestaurant(restaurantInfo) {
    return await RestaurantModel.create(restaurantInfo);
  }
}

module.exports = RestaurantRepository;
