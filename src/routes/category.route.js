const checkAuth = require("../middlewares/checkAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = require("express").Router();

const {
  fetchAllCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { body } = require("express-validator");

const categoryValidation = [
  body("name").not().isEmpty().withMessage("category name is required"),
];

router.get("/", fetchAllCategories);
router.get("/:categoryId", fetchCategoryById);
router.post("/", checkAuth, isAdmin, categoryValidation, createCategory);
router.put("/:categoryId", checkAuth, isAdmin, updateCategory);
router.delete("/:categoryId", checkAuth, isAdmin, deleteCategory);

module.exports = router;
