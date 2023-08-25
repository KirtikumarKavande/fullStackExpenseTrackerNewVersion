const Expense = require("../model/expense");

exports.addexpense = async (req, res) => {
  await Expense.create(req.body);
};
exports.getexpense = async (req, res) => {
  await Expense.findAll().then((expense) => {
    res.status(201).json(expense);
  });
};
exports.deleteExpense = (req, res, next) => {
  Expense.findByPk(req.params.id).then((expense) => {
    expense.destroy();
    res.send("delete success");
  });
};