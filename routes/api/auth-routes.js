const express = require("express");

const router = express.Router();

const { usersAddSchema } = require("../../schema/users-schema");

const { validateBody } = require("../../utils");

const {authenticate} = require("../../middlewares")

const {
  registerUser,
  loginUser,
  getCurrent,
  logout
} = require("../../controllers/auth-controllers");

router.post("/register", registerUser);
router.post("/login", validateBody(usersAddSchema), loginUser);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);

module.exports = router;
