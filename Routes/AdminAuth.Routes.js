const {
  adminSignUp,
  adminSignIn,
  adminChangePass,
} = require("../Controllers/Admin.Controller");

const express = require("express");


const router = express.Router();

// Admin Sign-up
router.post("/signup", adminSignUp);

// Admin Sign-in
router.post("/signin", adminSignIn);

// Change Password
router.post("/changepass", adminChangePass);

module.exports = router;
