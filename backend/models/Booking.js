import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    details: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },

    professionalName: {
      type: String,
      default: "None",
    },
    professionalId: {
      type: String,
    },

    bookingDateTime: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },

    cart: {
      type: [cartItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
