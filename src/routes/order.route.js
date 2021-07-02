const checkAuth = require("../middlewares/checkAuth");
const router = require("express").Router();

const {
  fetchOrderById,
  placeOrder,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
  ordersForMe,
  ordersByMe,
} = require("../controllers/order.controller");

router.get("/", fetchAllOrders);
router.get("/:orderId", fetchOrderById);
router.get("/orders_for_me/:userId", ordersForMe);
router.get("/orders_by_me/:userId", ordersByMe);
router.post("/", checkAuth, placeOrder);
router.put("/:orderId", checkAuth, updateOrder);
router.delete("/:orderId", checkAuth, deleteOrder);

module.exports = router;
