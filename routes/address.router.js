const express = require("express");
const router = express.Router();

const addressRouter = (addressController, authMiddleware) => {
    router.get(
        "/",
        authMiddleware.user(addressController.authRepository),
        async (req, res, next) => {
            try {
                const addresses = await addressController.getUserAddresses(req.auth._id);

                if (!addresses.length) {
                    res.status(200).send({ message: "no addresses to show" });
                }
                res.status(200).send(addresses);
            } catch (error) {
                next(error);
            }
        }
    );

    router.get(
        "/:addressId",
        authMiddleware.user(addressController.authRepository),
        async (req, res, next) => {
            try {
                const address = await addressController.getUserAddressById(req.auth._id, req.params.addressId);

                if (!address) {
                    res.status(200).send({ message: "no address to show" });
                }
                res.status(200).send(address);
            } catch (error) {
                next(error);
            }
        }
    );

    router.post("/",
        authMiddleware.user(addressController.authRepository),
        async (req, res, next) => {
            try {
                const newAddress = await addressController.createUserAddress(req.auth._id, req.body.details);

                res.status(200).send(newAddress);
            } catch (error) {
                next(error);
            }
        }
    );

    router.patch("/:addressId",
        authMiddleware.user(addressController.authRepository),
        async (req, res, next) => {
            try {
                const updatedAddress = await addressController.updateUserAddressById(req.auth._id, req.params.addressId, req.body);

                res.status(200).send(updatedAddress);
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete("/:addressId",
        authMiddleware.user(addressController.authRepository),
        async (req, res, next) => {
            try {
                const deletedAddress = await addressController.deleteUserAddress(req.auth._id, req.params.addressId);

                res.status(200).send(deletedAddress);
            } catch (error) {
                next(error);
            }
        }
    );


    return router;
};

module.exports = addressRouter;
