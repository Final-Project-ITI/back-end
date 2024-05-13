const RestaurantModel = require("../models/restaurant.model");

class RestaurantService {
  restaurants = [
    {
      id: 1,
      name: "Cuisine Central",
      categoryIds: [1, 3],
      icon: "https://example.com/cuisine-central-icon.png",
      description:
        "Experience a fusion of flavors from around the world at Cuisine Central.",
    },
    {
      id: 2,
      name: "Pizza Palace",
      categoryIds: [2],
      icon: "https://example.com/pizza-palace-icon.png",
      description: "Serving the best pizzas in town since 1990.",
    },
    {
      id: 3,
      name: "Sushi Delight",
      categoryIds: [4],
      icon: "https://example.com/sushi-delight-icon.png",
      description: "Indulge in authentic Japanese sushi delicacies.",
    },
    {
      id: 4,
      name: "Burger Barn",
      categoryIds: [5],
      icon: "https://example.com/burger-barn-icon.png",
      description: "Home of the juiciest burgers and fries in the city.",
    },
    {
      id: 5,
      name: "Pasta Paradise",
      categoryIds: [1],
      icon: "https://example.com/pasta-paradise-icon.png",
      description: "Taste Italy with every bite at Pasta Paradise.",
    },
    {
      id: 6,
      name: "Taco Town",
      categoryIds: [6],
      icon: "https://example.com/taco-town-icon.png",
      description:
        "Satisfy your cravings with our delicious tacos and burritos.",
    },
    {
      id: 7,
      name: "BBQ Bonanza",
      categoryIds: [5],
      icon: "https://example.com/bbq-bonanza-icon.png",
      description: "Experience the ultimate barbecue feast at BBQ Bonanza.",
    },
    {
      id: 8,
      name: "Vegetarian Haven",
      categoryIds: [7],
      icon: "https://example.com/vegetarian-haven-icon.png",
      description:
        "Delight in our flavorful vegetarian dishes, fresh and healthy.",
    },
    {
      id: 9,
      name: "Seafood Sensation",
      categoryIds: [8],
      icon: "https://example.com/seafood-sensation-icon.png",
      description:
        "Dive into a world of seafood delights at Seafood Sensation.",
    },
    {
      id: 10,
      name: "Dessert Dreams",
      categoryIds: [9],
      icon: "https://example.com/dessert-dreams-icon.png",
      description: "Satisfy your sweet tooth with our heavenly desserts.",
    },
  ];

  getRestaurantsByName(name) {
    const restaurants = this.restaurants.filter((res) =>
      res.name.toLowerCase().includes(name)
    );

    return restaurants;
  }

  async addRestaurant(restaurantInfo) {
    try {
      return await RestaurantModel.create(restaurantInfo);
    } catch (error) {
      return error;
    }
  }

  getAllRestaurants() {
    return this.restaurants;
  }
}

module.exports = RestaurantService;
