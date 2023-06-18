const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const { ctrlWrapper } = require("../../utils");

const { User } = require("../../service/");

const avatarsPath = path.resolve("public", "avatars");

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

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
