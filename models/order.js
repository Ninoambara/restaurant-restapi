const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Order {
  static orders() {
    const orderCollection = getDb().collection("order");
    return orderCollection;
  }

  static async create(data) {
    return await this.orders().insertOne(data);
  }
}

module.exports = Order;
