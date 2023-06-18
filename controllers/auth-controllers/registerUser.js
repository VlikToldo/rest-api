const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");
require("dotenv").config();

const { PROJECT_URL } = process.env;

const { User } = require("../../service/");

const { HttpError, sendEmail } = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const registerUser = async (req, res) => {
  const avatar = gravatar.url(req.body.email);

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    subscription: req.body.subscription,
    avatarURL: avatar,
    verificationToken: nanoid(),
  };

  const currentUser = await User.findUserByEmail({ email: newUser.email });
  if (currentUser !== null) {
    throw new HttpError(409, `Email in use`);
  }

  newUser.password = await bcrypt.hash(newUser.password, 10);

  await User.register(newUser);

  const verifyEmail = {
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href = "${PROJECT_URL}/api/users/verify/${newUser.verificationToken}">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };
