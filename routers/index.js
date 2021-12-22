const axios = require("axios");
const express = require("express");

const Users = require("../models/users.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Make Login Join!");
});

router.get("/userSession", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.query.ID },
    });
    const api = await Apis.findAll({ where: { email: req.query.ID } });
    const result = { user, api };
    res.json(result);
  } catch {
    console.log("세션 에러");
  }
});

module.exports = router;
