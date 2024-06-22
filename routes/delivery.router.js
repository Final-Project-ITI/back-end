const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const deliveryRouter = (deliveryController, authMiddleware) => {

  router.patch(
    "/:id/accept",
    authMiddleware.deliveryMan(deliveryController.authRepository,deliveryController.deliveryRepository),
    async (req, res, next) => {
      try {
        res.status(200).send(deliveryController.acceptDelivery(req.params.id,req.deliveryMan._id,req.body));
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
        res.status(200).send(deliveryController.updateDelivery(req.params.id,req.deliveryMan._id,req.body));
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
        const delivery = await deliveryController.getDelivery();

        if (!delivery) {
          res.status(200).send({ message: "delivery is empty" });
        }

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

        if (!delivery) {
          res.status(200).send({ message: "delivery is empty" });
        }

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
