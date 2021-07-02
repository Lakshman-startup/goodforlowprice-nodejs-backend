const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  fetchAllBusinessUsers,
  fetchBusinessProducts,
  fetchAllOrders,
} = require("../controllers/business.controller");

router.get("/", fetchAllBusinessUsers);

router.get("/products", fetchBusinessProducts);
router.get("/orders", checkAuth, fetchAllOrders);
module.exports = router;
