const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const restaurantRouter = (restaurantController,authMiddleware) => {

  router.get(
    "/search/:name",
    asyncHandler(async (req, res) => {
      const response = await restaurantController.getRestaurantsByName(
        req.params.name
      );
      res.status(response.statusCode).send(response.data);
    })
  );
  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const response = await restaurantController.getAllRestaurants();
      res.status(response.statusCode).send(response.data);
    })
  );
  router.post("/authorization/register",authMiddleware.admin(),asyncHandler(async (req, res) => {
    const response = await restaurantController.addRestaurant(req.body);
    res.status(response.statusCode).send(response.data);
  }));

  return router;
};

module.exports = restaurantRouter;
