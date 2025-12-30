import express from "express";
import {
  registerUser,
  addBookingToUser,
  allUsers,
  loginUser,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../authmiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/:userId/add-booking", addBookingToUser);
router.get("/allUsers", protect, adminOnly, allUsers);
export default router;
