class RestaurantController {
  restaurantService;
  authService;
  response = {
    statusCode: 0,
    data: {},
  };
  constructor(restaurantService, authService) {
    this.restaurantService = restaurantService;
    this.authService = authService;
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
  async addRestaurant(restaurantInfo) {
    const { name, decription, icon } = restaurantInfo;
    //Add new restaurant information to the database.
    const restaurant = await this.restaurantService.addRestaurant({ name,decription,icon });

    //assign restaurant to user
    let user = await this.authService.getUser({ _id:restaurantInfo.userId });
    
    if (!user ) {
      this.respones = {
        statusCode: 401,
        data: { message: "user not found " },
      };

      return this.respones;
    }
    user = await this.authService.updateUser({ _id:restaurantInfo.userId },{typeID:"663e9b24a2ede177e6885e45",resturantID:restaurant._id});




    return { statusCode: 200, data: {...restaurant,...user }}
  }
}

module.exports = RestaurantController;
