import express from "express";
import booking from "../models/booking.model.js";

const router = express.Router();

// POST: Create a booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a booking by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete appointment." });
  }
});

export default router;
