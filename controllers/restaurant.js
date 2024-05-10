class RestaurantController {
  restaurantService;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
  }

  async getRestaurantsByName(name) {
    const restaurants = await this.restaurantService.getRestaurantsByName(
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
    const restaurants = await this.restaurantService.getAllRestaurants();
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
}

module.exports = RestaurantController;
