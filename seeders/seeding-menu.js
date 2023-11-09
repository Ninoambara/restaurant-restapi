require('dotenv').config();
const { MongoClient } = require("mongodb");
const menu = require("../data/menu.json");
const toppings = require("../data/topping.json");
const filling = require("../data/filling.json");
// const uri =  "mongodb://127.0.0.1:27017";
const uri = process.env.MONGO_URL

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("restaurant");

    const menuCollection = database.collection("menu");
    const toppingCollection = database.collection("topping");
    const fillingCollection = database.collection("filling");
    await database.createCollection("order");

    const menuOption = { ordered: true };
    const menuResult = await menuCollection.insertMany(menu, menuOption);
    console.log("Seeding menu collection done");

    // Seeding koleksi "topping"
    const toppingOption = { ordered: true };
    const toppingResult = await toppingCollection.insertMany(
      toppings,
      toppingOption
    );
    console.log("Seeding topping collection done");

    // Seeding koleksi "filling"

    const fillingOption = { ordered: true };
    const fillingResult = await fillingCollection.insertMany(
      filling,
      fillingOption
    );

    console.log("Seeding filling collection result done");

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
