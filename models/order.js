const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class Order {
  static orders() {
    const orderCollection = getDb().collection("order");
    return orderCollection;
  }

  static async fetchAll() {
    return await this.orders().find().toArray();
  }

  static async create(data) {
    return await this.orders().insertOne(data);
  }

  static async updateStatus(orderId, newStatus) {
    const filter = { _id: new ObjectId(orderId) };
    const update = { $set: { status: newStatus } };

    return await this.orders().updateOne(filter, update);
  }

  static async findByPk(id) {
    return await this.orders().findOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = Order;
