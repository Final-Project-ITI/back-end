const express = require("express");
const router = express.Router();

const paymentRouter = (paymentController) => {
  router.post("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
      const session = await paymentController.payWithStripe(req, userId);
      res.status(200).json({ status: "success", session });
    } catch (error) {
      console.error("Error in paymentRouter:", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  return router;
};

module.exports = paymentRouter;
