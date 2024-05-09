const jwt = require('jsonwebtoken')
class AuthController {

  authService;
  respones = {
    statusCode: 0,
  };

  constructor(authService) {
    this.authService = authService;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;

    /* find the user by the email */

    const user = await this.authService.getUser({ email });

    /* checks if the user exits || the email & password matching */

    //await bcrypt.compare(password, user.encryptedPassword)

    if (!user || user?.password !== password) {
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
}

module.exports = AuthController;
