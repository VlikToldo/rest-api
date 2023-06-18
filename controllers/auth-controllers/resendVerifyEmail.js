require("dotenv").config();

const { User } = require("../../service/");

const { sendEmail } = require("../../helpers");

const { PROJECT_URL } = process.env;

const { ctrlWrapper } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }

  const user = await User.findUserByEmail(email);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const verifyEmail = {
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href = "${PROJECT_URL}/api/users/verify/${newUser.verificationToken}">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
