const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const deliveryRouter = (deliveryController, authMiddleware) => {

  router.patch(
    "/:id/accept",
    authMiddleware.deliveryMan(deliveryController.authRepository,deliveryController.deliveryManRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryController.acceptDelivery(req.params.id,req.deliveryMan._id,req.body));
      } catch (error) {
        next(error);
      }
    }
  );
  router.patch(
    "/:id/deliverd",
    authMiddleware.deliveryMan(deliveryController.authRepository,deliveryController.deliveryRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryController.updateDelivery(req.params.id,req.deliveryMan._id,req.body));
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:deliveryManId/deliveryMan",
    authMiddleware.admin(deliveryController.authRepository),
    async (req, res, next) => {
      try {
        const delivery = await deliveryController.getDeliverManDeliveries(req.params.deliveryManId);

        res.status(200).send(delivery);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:deliveryManId/current/deliveryMan",
    authMiddleware.admin(deliveryController.authRepository),
    async (req, res, next) => {
      try {
        const delivery = await deliveryController.getDeliveryManCurrentDeliveries(req.params.deliveryManId);

        res.status(200).send(delivery);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    authMiddleware.admin(deliveryController.authRepository),
    async (req, res, next) => {
      try {
        const delivery = await deliveryController.getDelivery(req.params.id);



        res.status(200).send(delivery);
      } catch (error) {
        next(error);
      }
    }
  );

  
  router.get(
    "/",
    authMiddleware.admin(deliveryController.authRepository),
    async (req, res, next) => {
      try {
        const delivery = await deliveryController.getAllDeliveries();


        res.status(200).send(delivery);
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    "/:orderId",
    authMiddleware.user(deliveryController.authRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(await deliveryController.createDelivery(req.params.orderId,req.body));
      } catch (error) {
        next(error);
      }
    }
  );




  return router;
};

module.exports = deliveryRouter;
