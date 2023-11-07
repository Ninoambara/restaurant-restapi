require("dotenv").config();
const { connect } = require("./config");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connect().then((db) => {
  // console.log(db)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
