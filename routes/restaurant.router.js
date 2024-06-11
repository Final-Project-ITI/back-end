const express = require("express");
const router = express.Router();

const restaurantRouter = (restaurantController, authMiddleware, multerMiddleware) => {

  router.get(
    "/search/:name",
    async (req, res, next) => {
      try {
        const restaurants = await restaurantController.getRestaurantsByName(
          req.params.name
        );

        if (!restaurants.length) {
          res.status(200).send({ message: "No results found" });
        }

        res.status(200).send(restaurants);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    async (req, res, next) => {
      try {
        const restaurant = await restaurantController.getRestaurantById(req.params.id);

        res.status(200).send(restaurant);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/",
    async (req, res, next) => {
      try {
        const restaurants = await restaurantController.getAllRestaurants();

        res.status(200).send(restaurants);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post("/authorization/register",
    authMiddleware.admin(restaurantController.authRepository),
    multerMiddleware.uploadMultipleImages(["icon", "banner"]),
    async (req, res, next) => {
      try {
        const newRestaurant = await restaurantController.addRestaurant(req.body, req.files.banner[0], req.files.icon[0]);

        res.status(201).send(newRestaurant);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = restaurantRouter;
