const jwt = require("jsonwebtoken");
const User = require("../model/userSignup");
authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "98kirtikmarseqnjde132323123232kjcdbcf");
    User.findByPk(user.signupuserId)
      .then((user) => {
        console.log(">>>>>>>>>>>>>>>>>>", user);
        console.log("strigified", JSON.stringify(user));
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: "false" });
  }
};

module.exports={authenticate}
