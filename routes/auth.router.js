const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authRouter = (authController) => {
  router.post("/login", asyncHandler(
    async (req, res) => {
      const respones = await authController.login(req.body);

      res.status(respones.statusCode).send(respones.data);
    }
  ));

  router.post("/register", asyncHandler(
    async (req, res) => {
      const respones = await authController.register(req.body);
      res.status(respones.statusCode).send(respones.data);
    }
  ));


  return router;
};
module.exports = authRouter;