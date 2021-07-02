const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      trim: true,
      default: 0,
    },

    category: {
      type:String,
      required:true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },

    expiration: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    userType: {
      type: String,
      enum: ["user", "business"],
      default: "user",
    },
  },

  { timestamps: true }
);

module.exports = model("Product", productSchema);
