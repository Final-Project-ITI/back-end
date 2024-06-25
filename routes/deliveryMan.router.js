const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const deliveryManRouter = (deliveryManController,authMiddleware) => {

  
  router.post(
    "/",
    authMiddleware.admin(deliveryManController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryManController.createDeliveryMan({phoneNumber:req.body.phone,email:req.body.email}));
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/",
    authMiddleware.admin(deliveryManController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryManController.getAllDeliveryMen());
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/:deliveryManId",
    authMiddleware.admin(deliveryManController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryManController.getDeliveryMan(req.params.deliveryManId));
      } catch (error) {
        next(error);
      }
    }
  );
  router.patch(
    "/:deliveryManId",
    authMiddleware.admin(deliveryManController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(deliveryManController.updateDeliveryMan(req.params.deliveryManId,req.body));
      } catch (error) {
        next(error);
      }
    }
  );
  router.delete(
    "/:deliveryManId",
    authMiddleware.admin(deliveryManController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryManController.deleteDeliveryMan(req.params.deliveryManId));
      } catch (error) {
        next(error);
      }
    }
  );





  return router;
};

module.exports = deliveryManRouter;
