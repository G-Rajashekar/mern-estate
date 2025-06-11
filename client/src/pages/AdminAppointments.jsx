import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
        alert(data.message || "Appointment deleted successfully.");
      } else {
        alert(data.message || "Failed to delete appointment.");
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading appointments...</p>;

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">All Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Property Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="hover:bg-gray-50">
                <td className="border p-2">{appt.name}</td>
                <td className="border p-2">{appt.email}</td>
                <td className="border p-2">{appt.date}</td>
                <td className="border p-2">{appt.message}</td>
                <td className="border p-2 capitalize">{appt.purpose}</td>
                <td className="border p-2">{appt.propertyName}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
