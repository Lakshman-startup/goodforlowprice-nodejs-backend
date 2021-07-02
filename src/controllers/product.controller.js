const { validationResult } = require("express-validator");
const { ACCESS_DENIED_ERR } = require("../errors");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.fetchProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "user",
      "-cart -password -phoneOtp"
    );

    return res.status(200).json({
      type: "success",
      message: "fetch product by id",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------- fetch my products ---------------------------

exports.fetchMyProducts = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    const products = await Product.find({ user: currentUser._id }).populate(
      "user",
      "-cart -password -phoneOtp"
    );

    return res.status(200).json({
      type: "success",
      message: "fetch products of current user",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------- create new product ---------------------------

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({ status: 422, message: "user input error", data: errors.mapped() });
      return;
    }
    const currentUser = res.locals.user;

    const newProduct = new Product({
      ...req.body,
      user: currentUser._id,
      userType: currentUser.role,
    });

    const saveProduct = await newProduct.save();

    return res.status(200).json({
      type: "success",
      message: "Product created successfully",
      data: {
        productId: saveProduct._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------ update product -----------------
exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const currentUser = res.locals.user;

    const product = await Product.findById(productId);

    if (currentUser._id != String(product.user)) {
      next({ status: 401, message: ACCESS_DENIED_ERR });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.body,
      },
      { new: true }
    ).populate("user", "-cart -password -phoneOtp");

    return res.status(200).json({
      type: "success",
      message: "Product updated successfully",
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------ delete product -----------------
exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const currentUser = res.locals.user;

    const product = await Product.findById(productId);

    if (currentUser._id != String(product.user)) {
      next({ status: 401, message: ACCESS_DENIED_ERR });
      return;
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      type: "success",
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// fetch all products

exports.fetchAllProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let products = [];

    if (category) {
      products = await Product.find({ category }).populate(
        "user",
        "-cart -password -phoneOtp"
      );
    } else {
      products = await Product.find().populate(
        "user",
        "-cart -password -phoneOtp"
      );
    }
    return res.status(200).json({
      type: "success",
      message: "get all products",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
