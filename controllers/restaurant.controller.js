const Errors = require("../error/error");

class RestaurantController {
  restaurantRepository;
  authRepository;

  constructor(_restaurantRepository, _authRepository) {
    this.restaurantRepository = _restaurantRepository;
    this.authRepository = _authRepository;
  }

  async getRestaurantsByName(name) {
    const restaurants = await this.restaurantRepository.getRestaurantsByName(
      name.toLowerCase()
    );

    return restaurants;
  }

  async getRestaurantById(_id) {
    const restaurant = await this.restaurantRepository.getRestaurantById({ _id });

    if (!restaurant) {
      throw new Errors.NotFoundError("restaurant not found");
    }

    return restaurant;
  }

  async getAllRestaurants() {
    const restaurants = await this.restaurantRepository.getAllRestaurants();

    if (!restaurants) {
      throw new Errors.NotFoundError("restaurants not found");
    }

    return restaurants;
  }

  async addRestaurant(body) {
    const { error, restaurantInfo } = await validateUser(body);
      if (error) {
        res.status(404).send("Invalid request");
        return;
      }

    const { name, description, icon } = restaurantInfo;
    let user = await this.authRepository.getUser({ _id: restaurantInfo.userId });

    if (!user) {
      throw new Errors.NotFoundError('user not found');
    }

    //Add new restaurant information to the database.

    const restaurant = await this.restaurantRepository.addRestaurant({ name, description, icon });

    //assign restaurant to user


    user = await this.authRepository.updateUser({ _id: restaurantInfo.userId }, { typeId: "663e9b24a2ede177e6885e45", restaurantId: restaurant._id });

    return { ...restaurant, ...user };
  }
}

module.exports = RestaurantController;
