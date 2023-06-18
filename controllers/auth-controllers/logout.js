const { User } = require("../../service/");

const { ctrlWrapper } = require("../../utils");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.removeToken(_id);

  res.json({
    message: "Logout success",
  });
};

module.exports = { logout: ctrlWrapper(logout) };
