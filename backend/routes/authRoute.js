const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
} = require("../controllers/authController");

const express = require("express");

const router = express.Router();

router.get("/register", registerGet);
router.post("/register", registerPost);
router.get("/login", loginGet);
router.post("/login", loginPost);
router.post("/logout", logoutPost);

module.exports = router;
