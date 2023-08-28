const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const user = require("./model/userSignup");
const expense = require("./model/expense");
const purchesRoutes=require('./routes/premiumMemberRoutes')
const Order=require('./model/orders')

const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

app.use(expenseRoutes);
app.use(purchesRoutes)

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(Order)
Order.belongsTo(user)

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
