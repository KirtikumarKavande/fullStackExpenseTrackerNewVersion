const signupUserModel = require("../model/userSignup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id,name,ispremiumuser) {
  return jwt.sign({ signupuserId: id,name:name,ispremiumuser }, "98kirtikmarseqnjde132323123232kjcdbcf");
}
exports.signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      await signupUserModel.create({ name, email, password: hash });
      res.status(200).json({ message: "user created successfully" });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signInUser = async (req, res, next) => {
  console.log("email", req.body.email);
  try {
    const data = await signupUserModel.findAll({
      where: { email: req.body.email },
    });

    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }

        if (result === true) {
          res.status(201).json({ success: true, message: "sign in success",token:generateAccessToken(data[0].id,data[0].name,data[0].ispremiumuser) });
        } else {
          res
            .status(400)
            .json({ success: false, message: "password is invalid" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
