const uuid = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../model/userSignup");
const Forgotpassword = require("../model/forgetPasswordModel");
require("dotenv").config();
const SendinblueApiV3Sdk = require("sib-api-v3-sdk");
const SendinblueAPIKey = process.env.SENDINBLUE_API_KEY;
SendinblueApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  SendinblueAPIKey;

// You can use this line for debugging purposes

// Change the values of the variables below to set subject, sender, recipient and content information.

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  console.log(">>>>>>email", user);
  if (user) {
    const id = uuid.v4();
    await Forgotpassword.create({ id, userId: user.id, active: true }).catch(
      (err) => {
        throw new Error(err);
      }
    );

    const subject = "Password Change request";
    const sender = { email: "kirtikumar0005@gmail.com", name: "kirtikumar" };
    const toEmail = [{ email: req.body.email }];
    const htmlContent = `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`;

    new SendinblueApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: subject,
        sender: sender,
        to: toEmail,
        htmlContent: htmlContent,
      })
      .then(
        function (data) {
          console.log(data);
          res.status(200).json(data);
        },
        function (error) {
          console.log(error);
          res.status(400).json(error);
        }
      );
  }
};

exports.resetpassword = async (req, res) => {
  const id = req.params.id;
  await Forgotpassword.findOne({ where: { id } }).then(
    async (forgotpasswordrequest) => {
      if (forgotpasswordrequest) {
        await forgotpasswordrequest.update({ active: false });
        res.status(200).send(`<html>
                                <script>
                                    function formsubmitted(e){
                                        e.preventDefault();
                                        console.log('called')
                                    }
                                </script>

                                <form action="/password/updatepassword/${id}" method="get">
                                    <label for="newpassword">Enter New password</label>
                                    <input name="newpassword" type="password" required></input>
                                    <button>reset password</button>
                                </form>
                            </html>`);
        res.end();
      }
    }
  );
};

exports.updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ where: { id: resetpasswordid } }).then(
      (resetpasswordrequest) => {
        User.findOne({ where: { id: resetpasswordrequest.userId } }).then(
          async (user) => {
            if (user) {
              bcrypt.hash(newpassword, 10, async (err, hash) => {
                await user.update({ password: hash });
                res.status(200).json({ message: "password Reset Success" });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};
