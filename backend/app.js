const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const user = require("./model/userSignup");
const expense = require("./model/expense");
const purchesRoutes = require("./routes/premiumMemberRoutes");
const forgetPasswordRoute = require("./routes/forgetpassword");
const Order = require("./model/orders");
const helmet = require("helmet");
const compression = require("compression");
const morgan=require("morgan");
const fs =require('fs');
const path = require("path");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{
  flags:'a'
})
app.use(morgan('combined',{stream:accessLogStream}))



app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

app.use(expenseRoutes);
app.use(purchesRoutes);
app.use("/password", forgetPasswordRoute);

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(Order);
Order.belongsTo(user);

sequelize
  .sync()

  .then(() => {
    app.listen(process.env.PORT||4000);
  })
  .catch((err) => {
    console.log(err);
  });
