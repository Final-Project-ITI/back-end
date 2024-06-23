const Errors = require("../error/error");
const validateRestaurant = require("../validators/restaurant.validator");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

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
    const restaurant = await this.restaurantRepository.getRestaurantById({
      _id,
    });

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

  async addRestaurant(body, banner, icon) {
    const { error, restaurantInfo } = await validateRestaurant(body);
    if (error) {
      throw new Errors.ApiError(error.message, 400);
    }

    const { name, description, address, email, phone } = body;
    let user = await this.authRepository.getUser({ email });

    if (!user) {
      throw new Errors.NotFoundError("user not found");
    }

    if (user.typeId._id.toString() !== "663dfebba2ede177e6885e42") {
      throw new Errors.ApiError("can only assign normal user", "400");
    }

    //Upload restaurant images

    const storage = getStorage();

    const iconSnapshot = await uploadBytesResumable(
      ref(storage, `restaurants/${name}/${uuidv4()}`),
      icon.buffer,
      { contentType: icon.mimetype }
    );

    const bannerSnapshot = await uploadBytesResumable(
      ref(storage, `restaurants/${name}/${uuidv4()}`),
      banner.buffer,
      { contentType: banner.mimetype }
    );

    //Add new restaurant information to the database.

    const restaurant = await this.restaurantRepository.addRestaurant({
      name,
      description,
      address,
      phone,
      icon: await getDownloadURL(iconSnapshot.ref),
      banner: await getDownloadURL(bannerSnapshot.ref)
    });

    //assign restaurant to user

    user = await this.authRepository.updateUser({ _id: user._id }, { typeId: "663e9b24a2ede177e6885e45", restaurantId: restaurant._id });

    return { ...restaurant, ...user };
  }
}

module.exports = RestaurantController;
