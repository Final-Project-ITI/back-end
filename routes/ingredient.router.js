const express = require("express");
const router = express.Router();

const ingredientRouter = (ingredientController, authMiddleware) => {
    router.get(
        "/",
        authMiddleware.restaurantAdmin(ingredientController.authRepository),
        async (req, res, next) => {
            try {
                const ingredients = await ingredientController.getRestaurantIngredients(req.auth.restaurantId);

                if (!ingredients.length) {
                    res.status(200).send({ message: "no ingredients to show" });
                }
                res.status(200).send(ingredients);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/:ingredientId",
        authMiddleware.restaurantAdmin(ingredientController.authRepository),
        async (req, res, next) => {
            try {
                const ingredient = await ingredientController.getRestaurantIngredientById(req.auth.restaurantId, req.params.ingredientId);

                if (!ingredient) {
                    res.status(200).send({ message: "no ingredient to show" });
                }
                res.status(200).send(ingredient);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        "/",
        authMiddleware.restaurantAdmin(ingredientController.authRepository),
        async (req, res, next) => {
            try {
                const newIngredient = await ingredientController.createRestaurantIngredient(req.auth.restaurantId, req.body.name);

                res.status(200).send(newIngredient);
            } catch (error) {
                next(error);
            }
        }
    );

    router.patch("/:ingredientId",
        authMiddleware.restaurantAdmin(ingredientController.authRepository),
        async (req, res, next) => {
            try {
                const updatedIngredient = await ingredientController.updateRestaurantIngredientById(req.auth.restaurantId, req.params.ingredientId, req.body);

                res.status(200).send(updatedIngredient);
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete("/:ingredientId",
        authMiddleware.restaurantAdmin(ingredientController.authRepository),
        async (req, res, next) => {
            try {
                const deletedIngredient = await ingredientController.deleteRestaurantIngredient(req.auth.restaurantId, req.params.ingredientId);

                res.status(200).send(deletedIngredient);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

module.exports = ingredientRouter;
