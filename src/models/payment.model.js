const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    razorpayDetail: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    success: Boolean,
  },
  { timestamps: true }
);


module.exports = model("Payment",paymentSchema)