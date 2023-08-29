const Razorpay = require("razorpay");
const Order = require("../model/orders");
const userController = require("./userController");
const User = require("../model/userSignup");
const EXpense = require("../model/expense");
const Expense = require("../model/expense");

exports.purchasepremium = (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_LbuGhJwSwmqPeJ",
      key_secret: "OqvYJgksErPAsLNDIYxod2Wx",
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};

exports.updatetransactionstatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({ paymentid: payment_id, status: "success" });
    const promise2 = req.user.update({ ispremiumuser: true });

    await Promise.all([promise1, promise2]);
    return res
      .status(202)

      .json({
        success: true,
        message: "transaction successful",
        token: userController.generateAccessToken(userId, undefined, true),
      });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "transaction unsuccessful" });
  }
};

exports.showleaderboard = async (req, res, next) => {
  const users = await User.findAll();
  const expenses = await Expense.findAll();

  const expensesData = {};
  expenses.forEach((expense) => {
    if (expensesData[expense.signupuserId]) {
      expensesData[expense.signupuserId] =
        +expensesData[expense.signupuserId] + +expense.amount;
    } else {
      expensesData[expense.signupuserId] = +expense.amount;
    }
  });
  const updatedExpensesData = [];
  users.forEach((res) => {
    updatedExpensesData.push({
      name: res.name,
      email:res.email,
      total_amount: expensesData[+res.id] || 0, //if user does not add expense take it as 0
    });
  });
  updatedExpensesData.sort((a, b) => b.total_amount - a.total_amount);

  res.status(200).json(updatedExpensesData);
};
