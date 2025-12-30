import express from "express";
import {
  addBooking,
  allUserBookings,
  allPendingBookings,
  allBookings,
  bookingDetails,
  changeStatus,
} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/addBooking", addBooking);
router.get("/allBookings", allBookings);
router.get("/bookingDetails", bookingDetails);
router.get("/allUserBookings", allUserBookings);
router.get("/allPendingBookings", allPendingBookings);
router.post("/changeStatus", changeStatus);

export default router;
