import React, { useState } from "react";

export default function Appointment({ listingId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
    purpose: "",
    propertyName: "",
  });
  const [booked, setBooked] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple manual validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.date ||
      !formData.message ||
      !formData.purpose ||
      !formData.propertyName
    ) {
      alert("Please fill out all fields before booking the appointment.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          listingId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setBooked(true);
      } else {
        alert(data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
      {booked ? (
        <p className="text-green-600 text-lg font-medium">
          Appointment booked successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min={new Date().toISOString().split("T")[0]}   // ✅ only today & future
            required
          />

          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Purpose</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Property Name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-500 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
