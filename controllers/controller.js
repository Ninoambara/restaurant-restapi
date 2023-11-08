const Menu = require("../models/Menu");
const { getDb } = require("../config");
const { ObjectId } = require("mongodb");
const Topping = require("../models/topping");
const Filling = require("../models/filling");

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
      const data = await Menu.findByPK(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
