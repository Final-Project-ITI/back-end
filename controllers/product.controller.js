const Errors = require("../error/error");
const findDuplicates = require("../utils/findDuplicatedValues");
const validateProduct = require("../validators/product.validator");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

class ProductController {
  restaurantRepository;
  productRepository;
  authRepository;
  menuCategoryRepository;
  ingredientRepository;

  constructor(_productRepository, _restaurantRepository, _authRepository, _menuCategoryRepository, _ingredientRepository) {
    this.productRepository = _productRepository;
    this.restaurantRepository = _restaurantRepository;
    this.authRepository = _authRepository;
    this.menuCategoryRepository = _menuCategoryRepository;
    this.ingredientRepository = _ingredientRepository;
  }

  async getAllProducts(restaurantId) {
    const products = await this.productRepository.getAllProducts(restaurantId);

    if (!products.length) {
      throw new Errors.NotFoundError("restaurant not found");
    }

    return products;
  }

  async getRestaurantsProductsById(restaurantId, productId) {
    const product = await this.productRepository.getRestaurantsProductsById(restaurantId, productId);

    if (!product) {
      throw new Errors.NotFoundError("product not found");
    }

    return product;
  }

  async createProduct(body, user, icon) {
    const { error } = validateProduct(body);

    if (error) {
      throw new Errors.ApiError(error.message, 400);
    }

    /* checks if the menu category exits */

    const menuCategory = this.menuCategoryRepository.getRestaurantMenuCategoryById(user.restaurantId, body.menuCategoryId);

    if (!menuCategory) {
      throw new Errors.NotFoundError("menu category does not exits");
    }

    /* checks if the ingredients exit */

    const ingredients = await this.ingredientRepository.getRestaurantIngredientsByIds(body.ingredientsIds);

    if (ingredients.length !== body.ingredientsIds.length) {
      throw new Errors.NotFoundError("something went wrong whilte checking on ingredients");
    }

    /* upload product image */

    const storage = getStorage();

    const iconSnapshot = await uploadBytesResumable(
      ref(storage, `categories/${user.restaurantId}/${uuidv4()}`),
      icon.buffer,
      { contentType: icon.mimetype }
    );

    body.icon = await getDownloadURL(iconSnapshot.ref);

    const product = await this.productRepository.createProduct(body, user.restaurantId);

    return product;
  }

  async updateProduct(updatedProductData, productId, user, icon) {
    if (icon) {
      const storage = getStorage();

      const iconSnapshot = await uploadBytesResumable(
        ref(storage, `categories/${user.restaurantId}/${uuidv4()}`),
        icon.buffer,
        { contentType: icon.mimetype }
      );

      updatedProductData.icon = await getDownloadURL(iconSnapshot.ref);
    }

    const updatedProduct = await this.productRepository.updateProduct(
      updatedProductData,
      productId,
      user.restaurantId
    );

    if (!updatedProduct.modifiedCount) {
      throw new Errors.ApiError("faild to update", 400);
    }

    return updatedProduct;
  }

  async deleteProduct(productId, user) {
    const isDeleted = await this.productRepository.deleteProduct(productId, user.restaurantId);

    if (!isDeleted.deletedCount) {
      throw new Errors.ApiError("faild to delete", 400);
    }

    return isDeleted;
  }
}

module.exports = ProductController;
