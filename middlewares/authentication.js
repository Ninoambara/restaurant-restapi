const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "unauthenticated" };
    }

    const payload = verifyToken(access_token);

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw { name: "unauthenticated" };
    }
    req.user = {
      id: findUser._id,
      username: findUser.username,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
