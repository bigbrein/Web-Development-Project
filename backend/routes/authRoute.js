const {
  register,
  login,
  logout,
  completeUserRegistration,
} = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth");

const express = require("express");

const router = express.Router();

router.post("/register/complete", requireAuth, completeUserRegistration);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
