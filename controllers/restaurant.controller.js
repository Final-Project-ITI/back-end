class RestaurantController {
  restaurantRepository;
  authRepository;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(_restaurantRepository, _authRepository) {
    this.restaurantRepository = _restaurantRepository;
    this.authRepository = _authRepository;
  }

  async getRestaurantsByName(name) {
    const restaurants = await this.restaurantRepository.getRestaurantsByName(
      name.toLowerCase()
    );

    if (!restaurants.length) {
      this.response = {
        statusCode: 404,
        data: {
          message: "restaurants not found",
        },
      };
      return this.response;
    }

    this.response = {
      statusCode: 200,
      data: restaurants,
    };

    return this.response;
  }

  async getAllRestaurants() {
    const restaurants = await this.restaurantRepository.getAllRestaurants();
    if (!restaurants) {
      this.response = {
        statusCode: 404,
        data: {
          message: "restaurants not found",
        },
      };
      return this.response;
    }

    this.response = {
      statusCode: 200,
      data: restaurants,
    };

    return this.response;
  }

  async addRestaurant(restaurantInfo) {
    const { name, description, icon } = restaurantInfo;
    //Add new restaurant information to the database.

    const restaurant = await this.restaurantRepository.addRestaurant({ name, description, icon });

    //assign restaurant to user
    let user = await this.authRepository.getUser({ _id: restaurantInfo.userId });

    if (!user) {
      this.response = {
        statusCode: 401,
        data: { message: "user not found " },
      };

      return this.response;
    }

    user = await this.authRepository.updateUser({ _id: restaurantInfo.userId }, { typeId: "663e9b24a2ede177e6885e45", restaurantId: restaurant._id });

    return { statusCode: 200, data: { ...restaurant, ...user } }
  }
}

module.exports = RestaurantController;
