const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Topping {
  static toppings() {
    const toppingsCollection = getDb().collection("topping");
    return toppingsCollection;
  }

  static async findAll(id) {
    return await this.toppings()
      .find({
        menuId: id,
      })
      .toArray();
  }
}

module.exports = Topping;
