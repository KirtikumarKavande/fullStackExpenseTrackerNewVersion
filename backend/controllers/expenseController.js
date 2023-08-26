const Expense = require("../model/expense");

exports.addexpense = async (req, res) => {
  req.user
    .createExpense({ ...req.body, signupuserId: req.user.id })
    .then((expense) => {
      return res.status(200).json({ success: true, expense });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
};
exports.getexpense = async (req, res) => {
  req.user.getExpenses().then((expense) => {
    res.status(201).json(expense);
  });
};
// exports.getexpense = async (req, res) => {
//   Expense.findAll().then((expense) => {
//     res.status(201).json(expense);
//   });
// };
exports.deleteExpense = (req, res, next) => {
  Expense.destroy({
    where: { id: req.params.id, signupuserId: req.user.id },
  }).then((myres) => {
    if (myres === 0) {
      return res
        .status(400)
        .json({ success: true, message: "expense not belongs to user" });
    }
    return res.status(200).json({ success: true, message: "delete success" });
  });
};
