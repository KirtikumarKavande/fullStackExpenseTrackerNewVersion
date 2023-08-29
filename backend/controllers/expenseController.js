const Expense = require("../model/expense");
const User = require("../model/userSignup");
const sequelize = require("../util/database");

exports.addexpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expense = req.user.createExpense(
      { ...req.body, signupuserId: req.user.id },
      { transaction: t }
    );

    const total_amount =
      Number(req.user.totalexpenses) + Number(req.body.amount);
    await User.update(
      { totalexpenses: total_amount },
      { where: { id: req.user.id }, transaction: t }
    );

    await t.commit();
    return res.status(200).json({ success: true, expense });
  } catch (err) {
    await t.rollback();

    return res.status(400).json({ success: false, message: err });
  }
};
exports.getexpense = async (req, res) => {
  req.user.getExpenses().then((expense) => {
    res.status(201).json(expense);
  });
};

exports.deleteExpense = (req, res, next) => {

req.user.getExpenses({where:{id:req.params.id}}).then((data)=>{

  const total_amount =
      Number(req.user.totalexpenses) -Number(data[0].amount);
     User.update(
      { totalexpenses: total_amount },
      { where: { id: req.user.id },}
    );

})

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
