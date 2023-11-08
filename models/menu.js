const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Menu {
  static menus() {
    const menuCollection = getDb().collection("menu");
    return menuCollection;
  }

  static async findAll() {
    return await this.menus().find().toArray();
  }

  static async findByPK(id) {
    return await this.menus().findOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = Menu;
