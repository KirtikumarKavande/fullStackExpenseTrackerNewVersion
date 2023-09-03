const Expense = require("../model/expense");
const User = require("../model/userSignup");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");

function uploadToS3(data, filename) {
  const BUCKET_NAME = "expensetrackerbykk";
  const IAM_USER_KEY = "AKIA5QV7O5GLDPSVK6EK";
  const IAM_USER_SECRET = "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";

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3response.Location);
      }
    });
  });
}

exports.downloadexpenses = async (req, res) => {
  const userId = req.user.id;
  const expenses = await req.user.getExpenses();
  const strigifiedExpenses = JSON.stringify(expenses);
  const filename = `Expense${userId}/${new Date()}.txt`;
  const fileURL = await uploadToS3(strigifiedExpenses, filename);
  console.log(">>>>>>fileUrl", fileURL);
  res.status(200).json({ fileURL, success: true });
};

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
  req.user.getExpenses({ where: { id: req.params.id } }).then((data) => {
    const total_amount =
      Number(req.user.totalexpenses) - Number(data[0].amount);
    User.update(
      { totalexpenses: total_amount },
      { where: { id: req.user.id } }
    );
  });

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
