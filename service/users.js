const User = require("./schemas/users-schema");

const register = (body) => {
  return User.create(body);
};

const verification = (id) => {
  return User.findByIdAndUpdate(id, { verificationToken: null, verify: true });
};

const addToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token });
};

const removeToken = (id) => {
  return User.findByIdAndUpdate(id, { token: "" });
};

const findUserById = (id) => {
  return User.findById({ _id: id });
};

const findUserByEmail = ({ email }) => {
  return User.findOne({ email });
};

const findByAppellation = (appellation) => {
  return User.findOne({verificationToken: appellation})
};

const updateAvatar = (id, avatarURL) => {
  return User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
  register,
  addToken,
  removeToken,
  findUserByEmail,
  findUserById,
  updateAvatar,
  verification,
  findByAppellation
};
