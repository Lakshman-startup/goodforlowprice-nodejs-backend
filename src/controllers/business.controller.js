const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

exports.fetchAllBusinessUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "business" }).select(
      "-cart -password -phoneOtp"
    );
    return res.status(200).json({
      type: "success",
      message: "fetch all  business users",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchBusinessProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ userType: "business" }).populate(
      "user",
      "-cart -password -phoneOtp"
    );
    return res.status(200).json({
      type: "success",
      message: "fetch all  business products",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllOrders = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    const orders = await Order.find({ orderTo: currentUser._id })
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");
    return res.status(200).json({
      type: "success",
      message: "fetch all   orders for business user",
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};
