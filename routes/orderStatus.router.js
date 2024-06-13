const express = require("express");
const router = express.Router();

const orderStatusRouter = (orderStatusController) => {
    router.get(
        "/",
        async (req, res, next) => {
            try {
                const ordersStatuses = await orderStatusController.getAllOrderStatuses();

                res.status(200).send(ordersStatuses);
            } catch (error) {
                next(error);
            }
        }
    );
    return router;
};

module.exports = orderStatusRouter;
