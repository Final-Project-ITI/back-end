const mongoose = require("mongoose");
const ServerUrl =
  "mongodb+srv://waleedAlmenawy:nf3VSmHh27xHStWa@iti.t3i9ucu.mongodb.net/foodi";

const database = () => {
  mongoose
    .connect(ServerUrl)
    .then((conn) => {
      console.log(`connected to the database ${conn.connection.host}`);
    })
    .catch((err) => console.log(err));
};
module.exports = database;
