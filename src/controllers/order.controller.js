const Order = require("../models/order.model");
const Razorpay = require("razorpay");
const { razorpay_key_id, razorpay_key_secret } = require("../config");
const shortid = require("shortid");
exports.fetchAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");

    return res.status(200).json({
      type: "success",
      message: "fetch orders",
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.ordersByMe = async (req, res, next) => {
  try {
    const orders = await Order.find({ orderBy: req.params.userId })
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");

    return res.status(200).json({
      type: "success",
      message: "fetch orders by specific user or business user by userId",
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.ordersForMe = async (req, res, next) => {
  try {
    const orders = await Order.find({"products.owner":req.params.userId})
     
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");

    return res.status(200).json({
      type: "success",
      message: "fetch orders by specific user or business user by userId",
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.fetchOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");

    return res.status(200).json({
      type: "success",
      message: "fetch order by orderId",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------- create new order ---------------------------

exports.placeOrder = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    const razorpay = new Razorpay({
      key_id: razorpay_key_id,
      key_secret: razorpay_key_secret,
    });

    const options = {
      amount: req.body.totalPrice,
      currency: "CAD",
      receipt: shortid.generate(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return next({ status: 400, message: "Razorpay order creation failed" });
    }

    const newOrder = new Order({
      ...req.body,
      orderBy: currentUser._id,
    });

    const saveOrder = await newOrder.save();

    return res.status(200).json({
      type: "success",
      message: "Order placed successfully",
      data: {
        orderId: saveOrder._id,
        razorpayOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------- update order ---------------------------

exports.updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const currentUser = res.locals.user;

    const order = await Order.findById(orderId);

    if (currentUser._id != String(order.orderBy)) {
      next({ status: 401, message: ACCESS_DENIED_ERR });
      return;
    }

    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        ...req.body,
      },
      { new: true }
    )
      .populate("orderBy", "-cart -password -phoneOtp")
      .populate("products.product");

    return res.status(200).json({
      type: "success",
      message: "Order updated successfully",
      data: {
        order: updateOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------- delete order ---------------------------

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const currentUser = res.locals.user;

    const order = await Order.findById(orderId);

    if (currentUser._id != String(order.orderBy)) {
      next({ status: 401, message: ACCESS_DENIED_ERR });
      return;
    }

    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({
      type: "success",
      message: "Order deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
