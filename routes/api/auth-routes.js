const express = require("express");

const router = express.Router();

const { usersAddSchema, userEmailSchema } = require("../../schema/users-schema");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const {
  registerUser,
  loginUser,
  getCurrent,
  logout,
  updateAvatar,
  verification,
  resendVerifyEmail
} = require("../../controllers/auth-controllers");

// signup
router.post("/register", registerUser);

router.get("/verify/:verificationToken", verification)

router.post("/verify", validateBody(userEmailSchema), resendVerifyEmail )

// signin
router.post("/login", validateBody(usersAddSchema), loginUser);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatarURL"), updateAvatar);


module.exports = router;
