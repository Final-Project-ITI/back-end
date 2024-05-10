const UserModel = require("../models/user.model");
const UserTypesModel=require("../models/userTypes.model")

class AuthService {
  constructor() { }

  users = [
    {
      _id: 1,
      email: "waleed.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
    {
      _id: 2,
      email: "kemo.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
    {
      _id: 3,
      email: "mohsen.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
  ]

  getUser({ _id }) {
    const user = this.users.find((user) => user._id == _id);

    if (user) return user;

    return null;
  }
  async addUser(userInfo) {
    try {
      return await UserModel.create(userInfo);
    } catch (error) {
      return error;
    }
  }
  async getType(_id) {
    try {
      return await UserTypesModel.find({_id});
    } catch (error) {
      return error;
    }
  }
}
module.exports = AuthService;
