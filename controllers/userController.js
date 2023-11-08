const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async regis(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: "username cannot empty" };
      }
      if (!password) {
        throw { name: "password cannot empty" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        username,
        password: hashedPassword,
      };

      const result = await User.create(userData);
      if (result) {
        return res.status(201).json({ message: "New User added" });
      } else {
        throw { name: "Failed Add New User" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "username cannot empty" };
      }
      if (!password) {
        throw { name: "password cannot empty" };
      }

      const user = await User.findOne(username);

      if (!user) {
        throw { name: "Invalid username/password" };
      }

      const validPass = bcrypt.compareSync(password, user.password);

      if (!validPass) {
        throw { name: "Invalid username/password" };
      }

      const access_token = createToken({ id: user._id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      if (!users) {
        throw {
          name: "user not found",
        };
      }
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
