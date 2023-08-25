const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes=require('./routes/userRoutes')
const expenseRoutes = require("./routes/expenseRoutes");


const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes)
app.use(expenseRoutes);


sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
