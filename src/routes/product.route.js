const checkAuth = require("../middlewares/checkAuth");
const router = require("express").Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById,
  fetchAllProducts,
  fetchMyProducts,
} = require("../controllers/product.controller");
const { body } = require("express-validator");

const productValidtion = [
  body("name").not().isEmpty().withMessage("product name is required"),
  body("description")
    .not()
    .isEmpty()
    .withMessage("product description is required"),
  body("price").not().isEmpty().withMessage("product price is required"),
  body("category").not().isEmpty().withMessage("product category is required"),
  body("image").not().isEmpty().withMessage("product image is required"),
  body("expiration")
    .not()
    .isEmpty()
    .withMessage("product expiration is required"),
];

router.get("/", fetchAllProducts);
router.get("/my_products", checkAuth, fetchMyProducts);
router.get("/:productId", fetchProductById);
router.post("/", checkAuth, productValidtion, createProduct);
router.put("/:productId", checkAuth, updateProduct);
router.delete("/:productId", checkAuth, deleteProduct);

module.exports = router;
