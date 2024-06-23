const UserModel = require("../models/user.model");
const UserTypesModel = require("../models/userTypes.model");

class AuthRepository {
  constructor() { }

  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      return error;
    }
  }

  async getUser(val) {
    try {
      return await UserModel.findOne(val).populate("typeId");
    } catch (error) {
      return error;
    }
  }
  async updateUser(id, val) {
    try {
      return await UserModel.updateOne(id, val);
    } catch (error) {
      return error;
    }
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
      return await UserTypesModel.find({ _id });
    } catch (error) {
      return error;
    }
  }

  async getTypeIdByName(name){
    try {
      return await UserTypesModel.find({ name })._id;
    } catch (error) {
      return error;
    }

  }
}
module.exports = AuthRepository;
