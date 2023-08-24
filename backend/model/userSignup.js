const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const signupUserModel= sequelize.define("signupuser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
});
module.exports=signupUserModel
