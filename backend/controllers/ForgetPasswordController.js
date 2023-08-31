// You need NodeJS installed to run this project
// First install dependencies by running npm install or yarn install inside the project directory
// Then rename .env.example to .env and set your API key as shown below in that file
// SENDINBLUE_API_KEY = "api-key"

require("dotenv").config();
const SendinblueApiV3Sdk = require("sib-api-v3-sdk");
const SendinblueAPIKey = process.env.SENDINBLUE_API_KEY;
SendinblueApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  SendinblueAPIKey;

// You can use this line for debugging purposes
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", SendinblueAPIKey);

// Change the values of the variables below to set subject, sender, recipient and content information.

exports.forgetPassword = async (req, res) => {
  const subject = "Password Change request";
  const sender = { email: "kirtikumar0005@gmail.com", name: "kirtikumar" };
  const toEmail = [{ email: req.body.email }];
  const htmlContent =
    "<html><body><h1>Password Change Request Raised by you</h1></body></html>";

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
        res.send(data);
      },
      function (error) {
        console.log(error);
        res.send(error);
      }
    );
};
