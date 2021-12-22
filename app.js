const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./models/index.js");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// redis
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

// 라우터 선언
const indexRouter = require("./routers/index.js");
const usersRouter = require("./routers/users.js");
const signinRouter = require("./routers/signin.js");
const signupRouter = require("./routers/signup.js");

const app = express();

// DB와 연결
sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// PORT setting
const PORT = 80;
app.set("port", process.env.PORT || PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// req.session 객체 생성
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    // redis저장 설정
    store: new RedisStore({ client: redisClient }),
  })
);

// URL과 라우터 매칭
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);

// ERROR 메세지 창
app.use((err, req, res, next) => {
  res.status(err.static || 500);
  res.send(err);
});

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
