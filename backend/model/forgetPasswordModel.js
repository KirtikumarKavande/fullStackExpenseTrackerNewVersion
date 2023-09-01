const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//id, name , password, phone number, role

const Forgotpassword = sequelize.define("forgotpassword", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  active: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
});

module.exports = Forgotpassword;
