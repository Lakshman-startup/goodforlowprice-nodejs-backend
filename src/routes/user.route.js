const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  fetchAllUsers,
  fetchUserProducts,
  fetchAllOrders,
  fetchAllPayments,
} = require("../controllers/user.controller");

router.get("/", fetchAllUsers);
router.get("/products", fetchUserProducts);

router.get("/orders", checkAuth, fetchAllOrders);
router.get("/payment", checkAuth, fetchAllPayments);

module.exports = router;
