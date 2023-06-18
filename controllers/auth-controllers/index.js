const { getCurrent } = require("./getCurrent");
const { loginUser } = require("./loginUser");
const { logout } = require("./logout");
const { registerUser } = require("./registerUser");
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { updateAvatar } = require("./updateAvatar");
const { verification } = require("./verification");

module.exports = {
  getCurrent,
  loginUser,
  logout,
  registerUser,
  resendVerifyEmail,
  updateAvatar,
  verification,
};
