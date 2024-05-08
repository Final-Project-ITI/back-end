const express = require("express");
const authRouter = require("./routes/auth");
const AuthController = require("./controllers/authCoteoller");
const AuthService = require("./services/authService");
const app = express();
const port = 3000;
const database = require("./database/database");
const authService = new AuthService();
const authCoteoller = new AuthController(authService);

database();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRouter(authCoteoller));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
