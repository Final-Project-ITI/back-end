class ProductController {
    phoneRepository;
    authRepository;

    constructor(_phoneRepository, _authRepository) {
        this.phoneRepository = _phoneRepository;
        this.authRepository = _authRepository;
    }

    async getUserPhoneNumbers(userId) {
        const phoneNumbers = await this.phoneRepository.getUserPhoneNumbers(userId);

        if (!phoneNumbers) {
            return {
                statusCode: 404,
                data: { message: "no phone numbers for the user" }
            }
        }

        return {
            statusCode: 200,
            data: phoneNumbers
        }
    }

    async getUserPhoneNumberById(phoneId) { }

    async updateUserPhoneNumberById(phoneId, newNumber) { }

    async createUserPhoneNumber({ phoneNumber }, userId) {
        const phoneNumbers = await this.phoneRepository.getUserPhoneNumbers(userId);

        const isPhoneNumberExists = phoneNumbers.find((phone) => phoneNumber === phone.phoneNumber);

        if (isPhoneNumberExists) {
            return {
                statusCode: 400,
                data: { message: "phone already exists" }
            }
        }

        await this.phoneRepository.createUserPhoneNumber({ userId, phoneNumber });

        return {
            statusCode: 200,
            data: { message: "new phone created" }
        }
    }

    async deleteUserPhoneNumber(phoneId) { }
}

module.exports = ProductController;
