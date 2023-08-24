const Sequelize = require('sequelize');
const sequelize = new Sequelize('expensetracker', 'root', 'Kolhapur@64', {
  dialect: 'mysql',
  host: 'localhost',
  
});
module.exports=sequelize
     