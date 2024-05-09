const express = require("express");
const bodyParser = require('body-parser')

const authRouter = require("./routes/auth.router");
const AuthController = require("./controllers/auth.coteoller");
const AuthService = require("./services/auth.service");
const AuthMiddleware = require("./middlewares/auth.middleware");

const mainRouter = express.Router();
const app = express();
const port = 3000;

const database = require("./database/database");

const authService = new AuthService();
const authCoteoller = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

database();
app.use(express.json());

mainRouter.use('/authentication', authRouter(authCoteoller, authMiddleware, authService));

app.use('/api/v1', mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
