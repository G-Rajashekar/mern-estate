import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  message: String,
  listingId: { type: String },  // if related to a listing
  purpose: {
    type: String,
    enum: ["buy",  "rent"],  // restrict to these values
    required: true
  },
  propertyName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const booking = mongoose.model("Booking", bookingSchema);

export default booking;
