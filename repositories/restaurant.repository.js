const { options } = require("joi");
const RestaurantModel = require("../models/restaurant.model");

class RestaurantRepository {
  async getRestaurantsByName(name) {
    return await RestaurantModel.find({ name: { $regex: name, $options: "i" } });
  }

  async getRestaurantById(_id) {
    return await RestaurantModel.findOne({ _id });
  }

  async getAllRestaurants() {
    return await RestaurantModel.find();
  }

  async addRestaurant(restaurantInfo) {
    return await RestaurantModel.create(restaurantInfo);
  }
}

module.exports = RestaurantRepository;
