const Errors = require("../error/error");
const validateCategory = require("../validators/menuCategory.validator");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

class MenuCategoryController {
    categoryRepository;
    authRepository;

    constructor(_categoryRepository, _authRepository) {
        this.categoryRepository = _categoryRepository;
        this.authRepository = _authRepository;
    }

    async getRestaurantMenuCategories(restaurantId) {
        return await this.categoryRepository.getRestaurantMenuCategories(restaurantId);
    }

    async getRestaurantMenuCategoryById(restaurantId, menuCategoryId) {
        return await this.categoryRepository.getRestaurantMenuCategoryById(restaurantId, menuCategoryId);
    }

    async createRestaurantMenuCategory(restaurantId, name, icon) {
        const { error } = validateCategory({ name });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const categories = await this.categoryRepository.getRestaurantMenuCategories(restaurantId);
        const isCategoryExist = categories.find((category) => name === category.name);

        if (isCategoryExist) {
            throw new Errors.ApiError("category already exist", 400);
        }

        //Upload restaurant images

        const storage = getStorage();

        const iconSnapshot = await uploadBytesResumable(
            ref(storage, `categories/${restaurantId}/${uuidv4()}`),
            icon.buffer,
            { contentType: icon.mimetype }
        );

        const newCategory = await this.categoryRepository.createRestaurantMenuCategory({
            restaurantId,
            name,
            icon: await getDownloadURL(iconSnapshot.ref),
        });

        return newCategory;
    }

    async updateRestaurantMenuCategoryById(restaurantId, menuCategoryId, val, icon) {
        const { error } = validateCategory(val);

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const category = await this.categoryRepository.getRestaurantMenuCategoryById(restaurantId, menuCategoryId);

        if (!category) {
            throw new Errors.NotFoundError("category not found");
        } else if (category.restaurantId._id.toString() !== restaurantId.toString()) {
            throw new Errors.UnAuthError();
        }

        if (icon) {
            const storage = getStorage();

            const iconSnapshot = await uploadBytesResumable(
                ref(storage, `categories/${restaurantId}/${uuidv4()}`),
                icon.buffer,
                { contentType: icon.mimetype }
            );

            val.icon = await getDownloadURL(iconSnapshot.ref);
        }

        return await this.categoryRepository.updateRestaurantMenuCategoryById(restaurantId, menuCategoryId, val);
    }

    async deleteRestaurantMenuCategory(restaurantId, menuCategoryId) {
        const category = await this.categoryRepository.getRestaurantMenuCategoryById(restaurantId, menuCategoryId);

        if (!category) {
            throw new Errors.NotFoundError("category not found");
        } else if (category.restaurantId._id.toString() !== restaurantId.toString()) {
            throw new Errors.UnAuthError();
        }

        return await this.categoryRepository.deleteRestaurantMenuCategory(restaurantId, menuCategoryId);
    }
}

module.exports = MenuCategoryController;
