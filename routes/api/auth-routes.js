const express = require("express");

const router = express.Router();

const { usersAddSchema } = require("../../schema/users-schema");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  updateAvatar
} = require("../../controllers/auth-controllers");

router.post("/register", registerUser);
router.post("/login", validateBody(usersAddSchema), loginUser);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("avatarURL"), updateAvatar);

module.exports = router;
