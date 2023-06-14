const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../service/");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const registerUser = async (req, res) => {
  const avatar = gravatar.url(req.body.email);

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    subscription: req.body.subscription,
    avatarURL: avatar,
  };

  const currentUser = await User.findUserByEmail({ email: newUser.email });
  if (currentUser !== null) {
    throw new HttpError(409, `Email in use`);
  }

  newUser.password = await bcrypt.hash(newUser.password, 10);

  await User.register(newUser);

  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findUserByEmail({ email });
  if (!user) {
    throw new HttpError(401, `Email or password is wrong`);
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

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.removeToken(_id);

  res.json({
    message: "Logout success",
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);

  Jimp.read(newPath, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(newPath);
  });

  const avatar = path.join("avatars", filename);

  const { _id } = req.user;
  await User.updateAvatar(_id, avatar);
  res.json({ avatar });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
