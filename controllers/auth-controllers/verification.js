const { User } = require("../../service/");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../utils");

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findByAppellation(verificationToken);
  if (!verificationToken) {
    throw new HttpError(404, "User not found");
  }
  console.log(user);
  await User.verification(user._id);

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = { verification: ctrlWrapper(verification) };
