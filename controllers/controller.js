const Menu = require("../models/menu");
const { getDb } = require("../config");
const { ObjectId } = require("mongodb");
const Topping = require("../models/topping");
const Filling = require("../models/filling");
const Order = require("../models/order");

class Controller {
  static async fetchMenu(req, res) {
    try {
      const data = await Menu.findAll();

      const menuWithFillingTopping = await Promise.all(
        data.map(async (menuItem) => {
          menuItem.toppings = await Topping.findAll(menuItem._id);
          menuItem.fillings = await Filling.findAll(menuItem._id);

          return menuItem;
        })
      );
      res.json(menuWithFillingTopping);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchOneItem(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await Menu.findByPK(id);

      if (data) {
        const toppings = await Topping.findAll(data._id);
        const fillings = await Filling.findAll(data._id);

        data.toppings = toppings;
        data.fillings = fillings;

        res.json(data);
      } else {
        res.status(404).json({ error: "Menu Not Found" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async orderNew(req, res) {
    try {
      const { menuId, filling, topping } = req.body;
      let totalPrice = 0;
      let selectedFilling;
      let selectedTopping;

      if (!menuId) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      // Validasi filling
      if (filling) {
        selectedFilling = await Filling.findByPk(filling);

        console.log(selectedFilling);

        if (!selectedFilling) {
          return res.status(400).json({ error: "Invalid filling selection" });
        }

        totalPrice += selectedFilling.price;
      }

      // Validasi topping
      if (topping) {
        const selectedTopping = await Topping.findByPk(topping);

        if (!selectedTopping) {
          return res.status(400).json({ error: "Invalid topping selection" });
        }

        totalPrice += selectedTopping.price;
      }

      const menu = await Menu.findByPK(menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu Not Found" });
      } else if (
        (menu &&
          selectedFilling &&
          selectedFilling.menuId.toString() !== menuId.toString()) ||
        (menu &&
          selectedTopping &&
          selectedTopping.menuId.toString() !== menuId.toString())
      ) {
        return res
          .status(400)
          .json({ error: "Invalid filling or topping for the selected menu" });
      } else {
        totalPrice += menu.price;
        const orderData = {
          menuId: menuId,
          filling: filling || null,
          topping: topping || null,
          status: false,
          totalPrice: totalPrice,
          userId: req.user.id,
        };

        const result = await Order.create(orderData);

        res.json({ message: `Your order of ${menu.name} success` });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async checkoutOrder(req, res) {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (order.status) {
        return res
          .status(400)
          .json({ error: "Order has already been checked out" });
      }

      await Order.updateStatus(orderId, true);

      res.json({ message: "Order checked out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async fetchAllOrder(req, res) {
    try {
      const data = await Order.fetchAll()

      res.json(data)

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Controller;
