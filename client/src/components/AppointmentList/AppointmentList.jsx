
import { useState } from "react";
import axios from "axios";

import "./AppointmentList.css";

// ==========================================
// DATE HELPERS
// ==========================================

const getTodayDate = () => {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTomorrowDate = () => {
  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const year =
    tomorrow.getFullYear();

  const month = String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    tomorrow.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatAppointmentDate = (date) => {
  if (!date) {
    return "Unknown date";
  }

  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  if (date === today) {
    return "Today";
  }

  if (date === tomorrow) {
    return "Tomorrow";
  }

  const appointmentDate =
    new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(
      appointmentDate.getTime()
    )
  ) {
    return date;
  }

  return appointmentDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatAppointmentTime = (
  time
) => {
  if (!time) {
    return "Unknown time";
  }

  const [hours, minutes] = 
     time.split(":");
  
  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
  );

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
};

// ==========================================
// APPOINTMENT LIST
// ==========================================

function AppointmentList({
  appointments = [],
  setAppointments,
  isLoading = false,
}) {
  // ==========================================
  // STATES
  // ==========================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [updatingId, setUpdatingId] =
    useState("");

  const [deletingId, setDeletingId] =
    useState("");

  // ==========================================
  // UPDATE APPOINTMENT STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      setErrorMessage("");
      setUpdatingId(id);

      const token =
        sessionStorage.getItem("adminToken");

      if (!token) {
        setErrorMessage(
          "Admin session expired. Please login again."
        );
        return;
      }

      const response = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/appointments/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAppointment =
        response.data.appointment;

      // Update only changed appointment
      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) =>
          appointment._id ===
          updatedAppointment._id
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error(
        "Update appointment error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to update appointment. Please try again."
      );
    } finally {
      setUpdatingId("");
    }
  };

  // ==========================================
  // DELETE APPOINTMENT
  // ==========================================

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setErrorMessage("");
      setDeletingId(id);

      const token =
        sessionStorage.getItem("adminToken");

      if (!token) {
        setErrorMessage(
          "Admin session expired. Please login again."
        );
        return;
      }

      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted appointment from UI
      setAppointments((previousAppointments) =>
        previousAppointments.filter(
          (appointment) =>
            appointment._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete appointment error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to delete appointment. Please try again."
      );
    } finally {
      setDeletingId("");
    }
  };

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredAppointments =
    appointments.filter((appointment) => {
      const searchValue = searchTerm
        .trim()
        .toLowerCase();

      const customerName =
        appointment.name
          ?.toLowerCase()
          .includes(searchValue);

      const customerPhone =
        appointment.phone
          ?.toLowerCase()
          .includes(searchValue);

      const customerService =
        appointment.service
          ?.toLowerCase()
          .includes(searchValue);

      const matchesSearch =
        customerName ||
        customerPhone ||
        customerService;

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  // ==========================================
  // FORMAT STATUS
  // ==========================================

  const formatStatus = (status = "") => {
    if (!status) {
      return "Unknown";
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <section className="appointment-section">
        <div className="appointment-message">
          Loading appointments...
        </div>
      </section>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section
      className="appointment-section"
      id="appointments"
    >
      {/* ======================================
          HEADER
      ====================================== */}

      <div className="appointment-section-header">
        <div>
          <p className="appointment-section-subtitle">
            BOOKING MANAGEMENT
          </p>

          <h2>Appointments</h2>

          <p>
            Manage customer appointments and
            booking status.
          </p>
        </div>

        <div className="appointment-count">
          {filteredAppointments.length}{" "}
          {filteredAppointments.length === 1
            ? "Appointment"
            : "Appointments"}
        </div>
      </div>

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {errorMessage && (
        <div
          className="appointment-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* ======================================
          SEARCH + FILTER
      ====================================== */}

      <div className="appointment-filters">
        {/* Search */}

        <div className="search-wrapper">
          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search name, phone or service..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="all">
            All Appointments
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>
      </div>

      {/* ======================================
          NO APPOINTMENTS
      ====================================== */}

      {appointments.length === 0 ? (
        <div className="appointment-message">
          <div className="empty-icon">
            📅
          </div>

          <h3>No appointments yet</h3>

          <p>
            Customer bookings will appear here.
          </p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        /* ====================================
           NO SEARCH RESULTS
        ==================================== */

        <div className="appointment-message">
          <div className="empty-icon">
            🔍
          </div>

          <h3>
            No matching appointments
          </h3>

          <p>
            Try changing your search or status
            filter.
          </p>

          <button
            className="clear-filter-btn"
            type="button"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* ====================================
           APPOINTMENT CARDS
        ==================================== */

        <div className="appointment-grid">
          {filteredAppointments.map(
            (appointment) => {
              const isUpdating =
                updatingId === appointment._id;

              const isDeleting =
                deletingId === appointment._id;

              return (
                <div
                  className="appointment-card"
                  key={appointment._id}
                >
                  {/* ==========================
                      CARD HEADER
                  ========================== */}

                  <div className="appointment-card-header">
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {appointment.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3>
                          {appointment.name}
                        </h3>

                        <span>
                          {appointment.phone}
                        </span>
                      </div>
                    </div>

                    {/* Status */}

                    <span
                      className={`appointment-status status-${appointment.status}`}
                    >
                      {formatStatus(
                        appointment.status
                      )}
                    </span>
                  </div>

                  {/* ==========================
                      APPOINTMENT DETAILS
                  ========================== */}

                  <div className="appointment-details">
                    {/* Service */}

                    <div className="appointment-detail">
                      <span>
                        Service
                      </span>

                      <strong>
                        {appointment.service}
                      </strong>
                    </div>

                    {/* Date */}

                    <div className="appointment-detail">
                      <span>
                        Date
                      </span>

                      <strong>
                        {formatAppointmentDate(
                          appointment.date
                        )}
                      </strong>

                      {appointment.date === 
                        getTodayDate() && (
                          <small className="today-badge">
                            TODAY
                          </small>
                        )}
                    </div>

                    {/* Time */}

                    <div className="appointment-detail">
                      <span>
                        Time
                      </span>

                      <strong>
                        {formatAppointmentTime(
                          appointment.time
                        )}
                      </strong>
                    </div>

                    {/* Email */}

                    {appointment.email && (
                      <div className="appointment-detail">
                        <span>
                          Email
                        </span>

                        <strong>
                          {appointment.email}
                        </strong>
                      </div>
                    )}

                    {/* Message */}

                    {appointment.message && (
                      <div className="appointment-message-detail">
                        <span>
                          Message
                        </span>

                        <p>
                          {appointment.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ==========================
                      SMART ACTION BUTTONS
                  ========================== */}

                  <div className="appointment-actions">
                    {/* ========================
                        PENDING
                    ======================== */}

                    {appointment.status ===
                      "pending" && (
                      <>
                        <button
                          type="button"
                          className="confirm-btn"
                          disabled={isUpdating}
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              "confirmed"
                            )
                          }
                        >
                          {isUpdating
                            ? "Updating..."
                            : "✓ Confirm"}
                        </button>

                        <button
                          type="button"
                          className="cancel-btn"
                          disabled={isUpdating}
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              "cancelled"
                            )
                          }
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}

                    {/* ========================
                        CONFIRMED
                    ======================== */}

                    {appointment.status ===
                      "confirmed" && (
                      <>
                        <button
                          type="button"
                          className="complete-btn"
                          disabled={isUpdating}
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              "completed"
                            )
                          }
                        >
                          {isUpdating
                            ? "Updating..."
                            : "✓ Complete"}
                        </button>

                        <button
                          type="button"
                          className="cancel-btn"
                          disabled={isUpdating}
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              "cancelled"
                            )
                          }
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}

                    {/* ========================
                        COMPLETED
                    ======================== */}

                    {appointment.status ===
                      "completed" && (
                      <span className="action-info">
                        ✓ Appointment Completed
                      </span>
                    )}

                    {/* ========================
                        CANCELLED
                    ======================== */}

                    {appointment.status ===
                      "cancelled" && (
                      <span className="action-info">
                        ✕ Appointment Cancelled
                      </span>
                    )}

                    {/* ========================
                        DELETE
                    ======================== */}

                    <button
                      type="button"
                      className="delete-btn"
                      disabled={
                        isDeleting ||
                        isUpdating
                      }
                      onClick={() =>
                        deleteAppointment(
                          appointment._id
                        )
                      }
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

export default AppointmentList;


