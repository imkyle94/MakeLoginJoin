const express = require("express");
const bcrypt = require("bcrypt");

const Users = require("../models/users.js");
const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    console.log("Signin DB server");

    let result = 0;
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    for (i = 0; i < user.length; i++) {
      if (await bcrypt.compare(req.body.password, user[i].password)) {
        result = 1;
      }
    }

    if (user && result == 1) {
      console.log("로그인 완료");
      res.json(user);
    } else if (user.length == 1) {
      res.json(2);
    } else res.json(3);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
