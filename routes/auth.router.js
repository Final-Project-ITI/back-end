const express = require("express");
const router = express.Router();
const authRouter = (authController) => {
  router.get("/", (req, res) => {
    const respones = authController.getHelloWorld();
    res.send(respones);
  });
  return router;
};
module.exports = authRouter;
