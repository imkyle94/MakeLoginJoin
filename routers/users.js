const express = require("express");
const Users = require("../models/users.js");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const users = await Users.findAll();
    console.log(users);
    res.send(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
