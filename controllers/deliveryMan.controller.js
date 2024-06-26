const Errors = require("../error/error");

class DeliveryManController {
    deliveryManRepository;
    authRepository;
    phoneRepository;

    constructor(_deliveryManRepository, _authRepository, _phoneRepository) {
        this.deliveryManRepository = _deliveryManRepository;
        this.authRepository = _authRepository;
        this.phoneRepository = _phoneRepository;
    }


    async getAllDeliveryMen() {
        return await this.deliveryManRepository.getAllDeliveryMen()
    }
    async getDeliveryMan(_id) {
        return await this.deliveryManRepository.getDeliveryMan({ _id })

    }
    async createDeliveryMan({ email, phoneNumber }) {
        if (!email | !phoneNumber) {
            throw new Errors.ApiError("missing data", 400);
        }
        const user = await this.authRepository.getUser({ email })
        if (!user) {
            throw new Errors.ApiError("user not found", 400);
        }
        if (user.typeId._id.toString() == "66771774961cf332096ffcb9") {
            throw new Errors.ApiError("already existed", 400)
        }


        const phone = await this.phoneRepository.getPhoneNumber({ phoneNumber });
        console.log(user, phone);
        if (!phone) {
            throw new Errors.ApiError("phone not found", 400);
        } if (phone.userId._id.toString() !== user._id.toString()) {
            throw new Errors.ApiError("wrong phone number", 400);
        }

        await this.authRepository.updateUser({ email }, { typeId: "66771774961cf332096ffcb9" })
        const deliveryMan = await this.deliveryManRepository.createDeliveryMan({ userId: user._id, phoneId: phone._id })
        return { _id: deliveryMan._id, currentlyDeliver: deliveryMan.currentlyDeliver, status: deliveryMan.status, userId: user, phoneId: phone }
    }
    async updateDeliveryMan(_id, updatedinfo) {
        const deliveryMan = await this.deliveryManRepository.getDeliveryMan({ _id });
        if (!deliveryMan) {
            throw new Errors.ApiError("deliveryMan not found", 400);
        }
        return await this.deliveryManRepository.updateDeliveryMan({ _id }, updatedinfo)
    }
    async deleteDeliveryMan(_id) {
        const deliveryMan = await this.deliveryManRepository.getDeliveryMan({ _id });
        if (!deliveryMan) {
            throw new Errors.ApiError("deliveryMan not found", 400);
        }
        await this.authRepository.updateUser({ _id: deliveryMan.userId._id }, { typeId: "663dfebba2ede177e6885e42" })
        return await this.deliveryManRepository.deleteDeliveryMan({ _id })
    }

}

module.exports = DeliveryManController