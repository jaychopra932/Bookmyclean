import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Add Booking
export const addBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookings.push(bookingId);
    await user.save();

    const booking = await Booking.create(req.body);
    res.json({
      message: "Booking added",
      bookings: user.bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Give all Bookings to admin
export const allBookings = async (req, res) => {
  try {
    let bookings = await Booking.find();
    res.json({
      bookings: bookings,
    });
  } catch (error) {}
};

//Give  Booking
export const bookingDetails = async (req, res) => {
  try {
    let { bookingId } = req.body;
    let booking = await Booking.find({ bookingId: bookingId });
    res.json({
      booking: booking,
    });
  } catch (error) {}
};

// Give all User Bookings
export const allUserBookings = async (req, res) => {
  let { userId } = req.body;
  const user = await User.findById(userId);
  let { bookings } = user;
  const allBookings = await Booking.find({ bookingId: { $in: bookings } });
  res.json({
    bookings: allBookings,
  });
  try {
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};

// Give Pending Bookings for Professional
export const allPendingBookings = async (req, res) => {
  const allBookings = await Booking.find({ status: "pending" });
  res.json({
    bookings: allBookings,
  });
  try {
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
};

//change Booking Status

export const changeStatus = async (req, res) => {
  try {
    let { bookingId, professionalId, professionalName, status } = req.body;

    let booking = await Booking.findOne({ bookingId });
    let user = await User.findById(professionalId);
    booking.professionalId = professionalId;
    booking.professionalName = professionalName;
    booking.status = status;

    user.bookings.push(bookingId);

    await user.save();
    await booking.save();
    res.json({ message: "Status Changed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
