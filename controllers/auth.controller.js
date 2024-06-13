const jwt = require('jsonwebtoken')
const Errors = require("../error/error");
const bcrypt = require("bcrypt");
const validateUser = require('../validators/user.validator');

class AuthController {
  authRepository;

  respones = {
    statusCode: 0,
  };

  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(loginInfo) {
    /* find the user by the email */
    /* checks if the user exits || the email & password matching */

    const { email, password } = loginInfo;
    const user = await this.authRepository.getUser({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Errors.ApiError("Incorrect email or password", 401);
    }

    /* generate token that will be send to the client */

    const token = jwt.sign({ _id: user._id, role: user.typeId }, process.env.JWT_SECRET_KEY, { expiresIn: "6h" });

    return { token };
  }

  async register(body, restaurantId) {
    const { error, registerInfo } = await validateUser(body);

    if (error) {
      throw new Errors.ApiError(error.message, 400);
    }

    body.email = body.email.toLowerCase()

    //* checks if the user exits 
    let user = await this.authRepository.getUser({ email: body.email });
    if (user) {
      throw new Errors.ApiError("email already exist", 401);
    }

    //* checks if the type exits 
    let type = await this.authRepository.getType(body.typeId);

    if (!type) {
      throw new Errors.ApiError("wrong type", 401);
    }

    //Implement logic to securely hash user password before storing.
    const passwordHash = await bcrypt.hash(body.password, 10);
    body.password = passwordHash;

    if (restaurantId) {
      body.typeId = "664fc05da9a0560d2742da1b";
      body.restaurantId = restaurantId;
    } else {
      delete body.typeId;
    }

    //Add new user information to the database.
    user = await this.authRepository.addUser(body)

    /* generate token that will be send to the client */
    const token = jwt.sign({ _id: user._id, role: type.name }, process.env.JWT_SECRET_KEY, { expiresIn: "6h" });

    return { token };
  }
}

module.exports = AuthController;
