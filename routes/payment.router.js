const express = require("express");
const router = express.Router();

const paymentRouter = (paymentController, authMiddleware) => {
  router.post(
    "/",
    authMiddleware.user(paymentController.authRepository),
    async (req, res, next) => {
      try {
        let response = await paymentController.payWithStripe(req.auth._id);
        res.status(200).json({ status: "success", session: response });
      } catch (error) {
        next(error);
      }
    }
  );
  return router;
};

module.exports = paymentRouter;
