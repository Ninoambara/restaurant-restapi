const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;

const createToken = (payload) => jwt.sign(payload, KEY);
const verifyToken = (token) => jwt.verify(token, KEY);

module.exports = { createToken, verifyToken };
