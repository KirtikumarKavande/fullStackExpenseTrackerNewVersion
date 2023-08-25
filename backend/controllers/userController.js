const signupUserModel = require("../model/userSignup");
exports.signUpUser = async (req, res, next) => {
  console.log(req.body);

  try {
    signupUserModel.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.send("signUp successfully");
};

exports.signInUser = async (req, res, next) => {
  console.log("email", req.body.email);
  try {
    const data = await signupUserModel.findAll({
      where: { email: req.body.email },
    });

    if (data.length > 0) {
      if (data[0].password === req.body.password) {
        res.status(201).json({ success: true, message: "sign in success" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "password is invalid" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
