const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Payment = require("../models/payment.model");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "-cart -password -phoneOtp"
    );

    return res.status(200).json({
      type: "success",
      message: "fetch all users",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchUserProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ userType: "user" }).populate(
      "user",
      "-cart -password -phoneOtp"
    );
    return res.status(200).json({
      type: "success",
      message: "fetch all normal user products",
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------- fetch orders  by me----------

exports.fetchAllOrders = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    const orders = await Order.find({ orderBy: currentUser._id })
      .populate("products.product")
      .populate("orderBy", "-cart -password -phoneOtp");
    return res.status(200).json({
      type: "success",
      message: "fetch all of my orders",
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------- fetch my  payments history----------

exports.fetchAllPayments = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    const payments = await Payment.find({ user: currentUser._id })
      .populate("user", "-password phoneOtp")
      .populate("order");
    return res.status(200).json({
      type: "success",
      message: "fetch all of my orders",
      data: {
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};
