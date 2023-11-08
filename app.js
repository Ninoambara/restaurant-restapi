require("dotenv").config();
const { connect, getDb } = require("./config");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

connect().then((db) => {
  // console.log(db)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
