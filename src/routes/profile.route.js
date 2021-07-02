const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  fetchProfileById,
  deleteProfile,
  updateProfile,
  addToCart,
} = require("../controllers/profile.controller");

router.get("/:userId", fetchProfileById);



router.patch("/cart",checkAuth, addToCart);



router.put("/:userId", checkAuth, updateProfile);

router.delete("/:userId", checkAuth, deleteProfile);



module.exports = router;
