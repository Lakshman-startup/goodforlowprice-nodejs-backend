const Payment = require("../models/payment.model");
const crypto = require("crypto");
const { razorpay_key_secret } = require("../config");

exports.createPayment = async (req, res, next) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      req.body;

    const currentUser = res.locals.user;

    const shasum = crypto.createHmac("sha256", razorpay_key_secret);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return next({ status: 400, message: "Transaction not legit!" });
    }

    const payment = new Payment({
      user: currentUser._id,
      order: orderId,
      razorpayDetail: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });

    const savePayment = await payment.save();
    return res.status(201).json({
      type: "success",
      message: "Payment created successfully",
      data: {
        paymentId: savePayment._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "-password -phoneOtp")
      .populate("order");
    return res.status(200).json({
      type: "success",
      message: "fetch all payments",
      data: {
        payments,
      },
    });
  } catch (error) {
    return error;
  }
};

exports.fetchPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate("user", "-password -phoneOtp")
      .populate("order");
    return res.status(200).json({
      type: "success",
      message: "fetch  payment by id",
      data: {
        payment,
      },
    });
  } catch (error) {
    return error;
  }
};
