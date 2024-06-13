const express = require("express");
const router = express.Router();

const menuCategoryRouter = (menuCategoryController, authMiddleware, multerMiddleware) => {
    router.get(
        "/",
        authMiddleware.restaurantAdmin(menuCategoryController.authRepository),
        async (req, res, next) => {
            try {
                const menuCategories = await menuCategoryController.getRestaurantMenuCategories(req.auth.restaurantId);

                res.status(200).send(menuCategories);
            } catch (error) {
                next(error);
            }
        }
    );
    router.get(
        "/:resId",
        async (req, res, next) => {
            try {
                const menuCategories = await menuCategoryController.getRestaurantMenuCategories(req.params.resId);

                res.status(200).send(menuCategories);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/:menuCategoryId",
        authMiddleware.restaurantAdmin(menuCategoryController.authRepository),
        async (req, res, next) => {
            try {
                const menuCategory = await menuCategoryController.getRestaurantMenuCategoryById(req.auth.restaurantId, req.params.menuCategoryId);

                res.status(200).send(menuCategory);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post(
        "/",
        authMiddleware.restaurantAdmin(menuCategoryController.authRepository),
        multerMiddleware.uploadSingleImage("icon"),
        async (req, res, next) => {
            try {
                const newMenuCategory = await menuCategoryController.createRestaurantMenuCategory(req.auth.restaurantId, req.body.name, req.file);

                res.status(200).send(newMenuCategory);
            } catch (error) {
                next(error);
            }
        }
    );

    router.patch("/:menuCategoryId",
        authMiddleware.restaurantAdmin(menuCategoryController.authRepository),
        multerMiddleware.uploadSingleImage("icon"),
        async (req, res, next) => {
            try {
                const updatedCategory = await menuCategoryController.updateRestaurantMenuCategoryById(req.auth.restaurantId, req.params.menuCategoryId, req.body, req.file);

                res.status(200).send(updatedCategory);
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete("/:menuCategoryId",
        authMiddleware.restaurantAdmin(menuCategoryController.authRepository),
        async (req, res, next) => {
            try {
                const deletedMenuCategory = await menuCategoryController.deleteRestaurantMenuCategory(req.auth.restaurantId, req.params.menuCategoryId);

                res.status(200).send(deletedMenuCategory);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
};

module.exports = menuCategoryRouter;
