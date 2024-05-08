class AuthController {
  authService;
  constructor(authService) {
    this.authService = authService;
  }
  getHelloWorld() {
    return this.authService.getHelloWorld();
  }
}

module.exports = AuthController;
