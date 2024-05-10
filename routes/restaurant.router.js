const express = require("express");
const router = express.Router();

const restaurantRouter = (restaurantController) => {
  router.get("/", (req, res) => {
    const response= restaurantController.getRestaurants()
    res.send(response);
  });

  return router;
};

module.exports = restaurantRouter;
