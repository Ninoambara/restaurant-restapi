const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Filling {
  static fillings() {
    const toppingsCollection = getDb().collection("filling");
    return toppingsCollection;
  }

  static async findAll(id) {
    return await this.fillings()
      .find({
        menuId: id,
      })
      .toArray();
  }

  static async findByPk(id) {
    return await this.fillings().findOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = Filling;
