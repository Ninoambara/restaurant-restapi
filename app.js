require("dotenv").config();
const { connect, getDb } = require("./config");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

connect().then((db) => {
  // console.log(db)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
