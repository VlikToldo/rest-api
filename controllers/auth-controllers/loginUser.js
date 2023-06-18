const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../service/");

const { ctrlWrapper } = require("../../utils");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findUserByEmail({ email });
  if (!user) {
    throw new HttpError(401, `Email or password is wrong`);
  }

  if (!user.verify) {
    throw new HttpError(401, "Verification is required");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError(401, `Email or password is wrong`);
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.addToken(id, token);

  return res.status(200).json({ token });
};

module.exports = { loginUser: ctrlWrapper(loginUser) };
