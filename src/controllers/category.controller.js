const { validationResult } = require("express-validator");
const Category = require("../models/category.model");

exports.createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({ status: 422, message: "user input error", data: errors.mapped() });
      return;
    }
    const newCategory = new Category({
      ...req.body,
    });

    const saveCategory = await newCategory.save();

    return res.status(201).json({
      type: "success",
      message: "new category created",
      data: {
        categoryId: saveCategory._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      type: "success",
      message: "fetch all categories",
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    return res.status(200).json({
      type: "success",
      message: "fetch category by id",
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );

    return res.status(201).json({
      type: "success",
      message: " category updated created",
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);

    return res.status(201).json({
      type: "success",
      message: " category deleted created",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
