const path = require("path");
const Sequelize = require("sequelize");

// Model 불러오기
const Users = require("./users");

const env = process.env.NODE_ENV || "development";

// MySQL connection setting
//const config = require(`${__dirname}/../config/config.js`)[env];
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db 객체에 모든 테이블 넣기
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = Users;

// MySQL에 모델 넣기
Users.init(sequelize);

// 관계 설정
Users.associate(db);

module.exports = db;
