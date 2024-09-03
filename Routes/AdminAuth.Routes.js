const {
  adminSignUp,
  adminSignIn,
  adminChangePass,
  refreshAT,
} = require("../Controllers/Admin.Controller");

const express = require("express");


const router = express.Router();

// Admin Sign-up
router.post("/signup", adminSignUp);

// Admin Sign-in
router.post("/signin", adminSignIn);

// Refresh Access Token
router.post("/refreshAT", refreshAT);

// Change Password
router.post("/changepass", adminChangePass);

module.exports = router;
