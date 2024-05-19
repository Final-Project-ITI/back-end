class ProductController {
    phoneService;
    authService;

    constructor(_phoneService, _authService) {
        this.phoneService = _phoneService;
        this.authService = _authService;
    }

    async getUserPhoneNumbers(userId) {
        const phoneNumbers = await this.phoneService.getUserPhoneNumbers(userId);

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
        const phoneNumbers = await this.phoneService.getUserPhoneNumbers(userId);

        const isPhoneNumberExists = phoneNumbers.find((phone) => phoneNumber === phone.phoneNumber);

        if (isPhoneNumberExists) {
            return {
                statusCode: 400,
                data: { message: "phone already exists" }
            }
        }

        await this.phoneService.createUserPhoneNumber({ userId, phoneNumber });

        return {
            statusCode: 200,
            data: { message: "new phone created" }
        }
    }

    async deleteUserPhoneNumber(phoneId) { }
}

module.exports = ProductController;
