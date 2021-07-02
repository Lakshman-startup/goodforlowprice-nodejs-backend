const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { EMAIL_INCORRECT_ERR } = require("../errors");

const {
  loginWithPhoneOtp,
  loginWithUsername,
  createNewUser,
  fetchCurrentUser,
  verifyPhoneOtp,
  changePassword,
  sendOtp,
  resetPassword
} = require("../controllers/auth.controller");

const checkAuth = require("../middlewares/checkAuth");

const loginWithUsernameValidation = [
  body("username").not().isEmpty().withMessage("email/phone must be required"),

  body("password").not().isEmpty().withMessage("Password must be required"),
];

const loginWithPhoneOtpValidation = [
  body("phone").not().isEmpty().withMessage("Phone number must be required"),
];

const registerValidation = [
  body("name").not().isEmpty().withMessage("Name must be required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address must be required")
    .isEmail()
    .withMessage(EMAIL_INCORRECT_ERR),
  body("phone").not().isEmpty().withMessage("Phone number must be required"),
];

router.post("/register", registerValidation, createNewUser);

// router.post("/verify_account", verifyAccount);

router.post(
  "/login_with_username",
  loginWithUsernameValidation,
  loginWithUsername
);
router.post(
  "/login_with_phone_otp",
  loginWithPhoneOtpValidation,
  loginWithPhoneOtp
);

router.get("/me", checkAuth, fetchCurrentUser);

router.post("/verify_phone_otp", verifyPhoneOtp);

router.post("/send_otp", sendOtp);

router.patch("/:userId/change_password", checkAuth, changePassword);
router.post("/reset_password", resetPassword);

module.exports = router;
