const Errors = require("../error/error");

class UserController {
    userRepository;
    authRepository;

    constructor(_userRepository, _authRepository) {
        this.userRepository = _userRepository;
        this.authRepository = _authRepository;
    }

    async getUser(userId) {
        const user = await this.userRepository.getUser(userId);

        return user;
    }

    async updateUser(userId, val) {
        const user = await this.userRepository.updateUser(userId, val);

        return user;
    }

    async getRestaurantsAdmins() {
        const admins = await this.userRepository.getRestaurantsAdmins();

        return admins;
    }

    async getRestaurantCashiers(resId) {
        const cashiers = await this.userRepository.getRestaurantCashiers(resId);

        return cashiers;
    }
}

module.exports = UserController;
