
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST: Create a booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
