const Errors = require("../error/error");
const validateIngredient = require("../validators/ingredient.validator");

class IngredientController {
    ingredientRepository;
    authRepository;

    constructor(_ingredientRepository, _authRepository) {
        this.ingredientRepository = _ingredientRepository;
        this.authRepository = _authRepository;
    }

    async getRestaurantIngredients(restaurantId) {
        return await this.ingredientRepository.getRestaurantIngredients(restaurantId);
    }

    async getRestaurantIngredientById(restaurantId, ingredientId) {
        return await this.ingredientRepository.getRestaurantIngredientById(restaurantId, ingredientId);
    }

    async createRestaurantIngredient(restaurantId, name) {
        const { error } = validateIngredient({ name });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const ingredients = await this.ingredientRepository.getRestaurantIngredients(restaurantId);

        const isIngredientExist = ingredients.find((ingredient) => name === ingredient.name);

        if (isIngredientExist) {
            throw new Errors.ApiError("ingredient already exist", 400);
        }

        const newIngredient = await this.ingredientRepository.createRestaurantIngredient({ restaurantId, name });

        return newIngredient;
    }

    async updateRestaurantIngredientById(restaurantId, ingredientId, { name }) {
        const { error } = validateIngredient({ name });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const ingredient = await this.ingredientRepository.getRestaurantIngredientById(restaurantId, ingredientId);

        if (!ingredient) {
            throw new Errors.NotFoundError("ingredient not found");
        } else if (ingredient.restaurantId._id.toString() !== restaurantId.toString()) {
            throw new Errors.UnAuthError();
        }

        return await this.ingredientRepository.updateRestaurantIngredientById(restaurantId, ingredientId, { name });
    }

    async deleteRestaurantIngredient(restaurantId, ingredientId) {
        const ingredient = await this.ingredientRepository.getRestaurantIngredientById(restaurantId, ingredientId);

        console.log(restaurantId, ingredientId)

        if (!ingredient) {
            throw new Errors.NotFoundError("ingredient not found");
        } else if (ingredient.restaurantId._id.toString() !== restaurantId.toString()) {
            throw new Errors.UnAuthError();
        }

        return await this.ingredientRepository.deleteRestaurantIngredient(restaurantId, ingredientId);
    }
}

module.exports = IngredientController;
