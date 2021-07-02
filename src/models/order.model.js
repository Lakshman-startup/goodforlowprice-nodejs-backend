const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 0,
        },

        owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["created", "deliver", "cancel", "packing"],
      default: "created",
    },
  },

  { timestamps: true }
);

module.exports = model("Order", orderSchema);
