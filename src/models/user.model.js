const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "business", "admin"],
      default: "user",
    },

    profilePic: {
      type: String,
      trim: true,
    },
    addresses: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      lat: String,
      lng: String,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    phoneOtp: String,

    socketId: String,

    isBlocked: {
      type: Boolean,
      default: false,
    },

    bio: {
      type: String,
      trim: true,
    },

    cart: {
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
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
