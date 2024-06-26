const Errors = require("../error/error");
const validatePhone = require("../validators/phone.validator");
class ProductController {
    phoneRepository;
    authRepository;

    constructor(_phoneRepository, _authRepository) {
        this.phoneRepository = _phoneRepository;
        this.authRepository = _authRepository;
    }

    async getUserPhoneNumbers(userId) {
        return await this.phoneRepository.getUserPhoneNumbers(userId);
    }

    async getUserPhoneNumberById(userId, phoneId) {
        return await this.phoneRepository.getUserPhoneNumberById(userId, phoneId);
    }

    async createUserPhoneNumber(userId, phoneNumber) {
        const { error } = validatePhone({ phoneNumber });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const phoneNumbers = await this.phoneRepository.getUserPhoneNumbers(userId);

        const isPhoneNumberExists = phoneNumbers.find((phone) => phoneNumber === phone.phoneNumber);

        if (isPhoneNumberExists) {
            throw new Errors.ApiError("phone already exist", 400);
        }

        console.log(userId)
        const newPhone = await this.phoneRepository.createUserPhoneNumber({ userId, phoneNumber });

        return newPhone;
    }

    async updateUserPhoneNumberById(userId, phoneId, { phoneNumber }) {
        const { error } = validatePhone({ phoneNumber });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const phone = await this.phoneRepository.getUserPhoneNumberById(userId, phoneId);

        if (!phone) {
            throw new Errors.NotFoundError("phone not found");
        }

        return await this.phoneRepository.updateUserPhoneNumberById(userId, phoneId, { phoneNumber });
    }

    async deleteUserPhoneNumber(userId, phoneId) {
        return await this.phoneRepository.deleteUserPhoneNumber(userId, phoneId);
    }
}

module.exports = ProductController;
