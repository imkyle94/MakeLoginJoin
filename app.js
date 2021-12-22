const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// PORT setting
const PORT = 80;
app.set("port", process.env.PORT || PORT);

// ERROR 메세지 창
app.use((err, req, res, next) => {
  res.status(err.static || 500);
  res.send(err);
});

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
