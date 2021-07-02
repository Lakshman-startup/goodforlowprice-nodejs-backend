const User = require("../models/user.model");
const { ACCESS_DENIED_ERR } = require("../errors");

exports.fetchProfileById = async (req, res, next) => {
  try {
    const profile = await User.findById(req.params.userId)
      .populate("cart.products.product")
      .select("-cart -password -phoneOtp");
    return res.status(200).json({
      type: "success",
      message: "fetch profile by id",
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const currentUser = res.locals.user;

    if (currentUser._id != userId) {
      next({ status: 401, message: ACCESS_DENIED_ERR, data: null });
      return;
    }

    const profile = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })
      .select("-password -phoneOtp")
      .populate("cart.products.product");
    return res.status(201).json({
      type: "success",
      message: "Profile updated successfully",
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const currentUser = res.locals.user;

    if (currentUser._id != userId) {
      next({ status: 401, message: ACCESS_DENIED_ERR, data: null });
      return;
    }

    await User.findByIdAndDelete(userId);
    return res.status(201).json({
      type: "success",
      message: "Profile deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    const user = await User.findByIdAndUpdate(currentUser._id, req.body, {
      new: true,
    })
      .populate("cart.products.product")
      .select("-password -phoneOtp");

    res.status(201).json({
      type: "success",
      message: "product added in cart",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
