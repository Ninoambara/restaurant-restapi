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
      const { id, filling, topping } = req.body;

      if (!id || !filling || !topping) {
        return res.status(400).json({ error: "Invalid input data" });
      }
      const selectedFilling = await Filling.findByPk(filling);
      const selectedTopping = await Topping.findByPk(topping);


      const menu = await Menu.findByPK(id);
      if (!menu) {
        return res.status(404).json({ error: "Menu Not Found" });
      } else if (
        (menu && selectedFilling.menuId.toString() !== id.toString()) ||
        selectedTopping.menuId.toString() !== id.toString()
      ) {
        return res
          .status(400)
          .json({ error: "Invalid filling or topping for the selected menu" });
      } else {
        const orderData = {
          menuId: id,
          filling: filling,
          topping: topping,
        };

        const result = await Order.create(orderData);

        res.json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
