const { MongoClient } = require("mongodb");
const menu = require("../data/menu.json");
const toppings = require("../data/topping.json");
const filling = require("../data/filling.json");
// const uri =  "mongodb://127.0.0.1:27017";
// const uri = //   your mongo url
const uri =
  "mongodb+srv://ninoambara:IeEZqELaecn8M4Le@cluster0.wg7pw1e.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("restaurant");

    const menuCollection = database.collection("menu");
    const menuOption = { ordered: true };
    const menuResult = await menuCollection.insertMany(menu, menuOption);
    console.log("Seeding menu collection done");

    // Seeding koleksi "topping"
    const toppingCollection = database.collection("topping");
    const toppingOption = { ordered: true };
    const toppingResult = await toppingCollection.insertMany(
      toppings,
      toppingOption
    );
    console.log("Seeding topping collection done");

    // Seeding koleksi "filling"
    const fillingCollection = database.collection("filling");
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
