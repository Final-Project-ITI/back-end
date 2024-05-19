const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

class AuthController {

  authRepository;
  respones = {
    statusCode: 0,
  };

  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;

    /* find the user by the email */

    const user = await this.authRepository.getUser({ email });

    /* checks if the user exits || the email & password matching */

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.respones = {
        statusCode: 401,
        data: { message: "Incorrect email or password" }
      }

      return this.respones;
    }

    /* generate token that will be send to the client */

    const token = jwt.sign({ _id: user.id, role: user.role }, "WaRsM", { expiresIn: "6h" });

    return { statusCode: 200, data: { token } };
  }

  async register(registerInfo) {
    try {

      registerInfo.email = registerInfo.email.toLowerCase()

      //* checks if the user exits 
      let user = await this.authRepository.getUser({ email: registerInfo.email });
      if (user) {
        this.respones = {
          statusCode: 401,
          data: { message: "email already exist" }
        }
        return this.respones;
      }

      //* checks if the type exits 
      let type = await this.authRepository.getType(registerInfo.typeId);

      if (!type) {
        this.respones = {
          statusCode: 401,
          data: { message: "wrong type" }
        }
        return this.respones;
      }

      //Implement logic to securely hash user password before storing.
      const passwordHash = await bcrypt.hash(registerInfo.password, 10);
      registerInfo.password = passwordHash;

      //Add new user information to the database.
      user = await this.authRepository.addUser(registerInfo)

      /* generate token that will be send to the client */
      const token = jwt.sign({ _id: user.id, role: type.name }, "WaRsM", { expiresIn: "6h" });


      return { statusCode: 200, data: { token } };
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AuthController;
