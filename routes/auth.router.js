const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')

const authRouter = (authController, authMiddleware, authService) => {
  router.post("/login", asyncHandler(
    async (req, res) => {
      const respones = await authController.login(req.body);

      res.status(respones.statusCode).send(respones.data);
    }
  ));


  router.get("/test", authMiddleware.user(authService), (req, res) => {
    console.log(req.auth);

    res.send("Test Middleware");
  });

  return router;
};
module.exports = authRouter;