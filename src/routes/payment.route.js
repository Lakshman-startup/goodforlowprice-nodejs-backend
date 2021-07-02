const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  fetchAllPayments,
  fetchPaymentById,
  createPayment,
} = require("../controllers/payment.controller");

router.get("/", fetchAllPayments);
router.get("/:paymentId", fetchPaymentById);
router.post("/", checkAuth, createPayment);

module.exports = router;
