const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");

const dotenv = require("dotenv").config();

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const result = await axios.post(process.env.DB_ADDRESS + "/signin", {
            email: email,
            password: password,
          });
          if (result.data == 3) {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          } else if (result.data == 2) {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          } else {
            done(null, result.data[0]);
          }
          // 여기 done이 index.js에서 serial부터 아래로 내려 간다.
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
