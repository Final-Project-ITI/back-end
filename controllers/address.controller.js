const Errors = require("../error/error");
const validateAddress = require("../validators/address.validator");
class AddressController {
    addressRepository;
    authRepository;

    constructor(_addressRepository, _authRepository) {
        this.addressRepository = _addressRepository;
        this.authRepository = _authRepository;
    }

    async getUserAddresses(userId) {
        return await this.addressRepository.getUserAddresses(userId);
    }

    async getUserAddressById(userId, addressId) {
        return await this.addressRepository.getUserAddressById(userId, addressId);
    }

    async createUserAddress(userId, details) {
        const { error } = validateAddress({ details });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const addresses = await this.addressRepository.getUserAddresses(userId);

        const isAddressExist = addresses.find((address) => details === address.details);

        if (isAddressExist) {
            throw new Errors.ApiError("address already exist", 400);
        }

        const newAddress = await this.addressRepository.createUserAddress({ userId, details });

        return newAddress;
    }

    async updateUserAddressById(userId, addressId, { details }) {
        const { error } = validateAddress({ details });

        if (error) {
            throw new Errors.ApiError(error.message, 400);
        }

        const phone = await this.addressRepository.getUserAddressById(userId, addressId);

        if (!phone) {
            throw new Errors.NotFoundError("phone not found");
        }

        return await this.addressRepository.updateUserAddressById(userId, addressId, { details });
    }

    async deleteUserAddress(userId, addressId) {
        return await this.addressRepository.deleteUserAddress(userId, addressId);
    }
}

module.exports = AddressController;
