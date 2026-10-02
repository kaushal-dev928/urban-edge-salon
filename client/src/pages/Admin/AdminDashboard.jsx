import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AppointmentList from "../../components/AppointmentList/AppointmentList";

import "./AdminDashboard.css";

function AdminDashboard() {
  // ==========================================
  // STATE
  // ==========================================

  const [appointments, setAppointments] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [dashboardError, setDashboardError] =
    useState("");

  // ==========================================
  // FETCH APPOINTMENTS
  // ==========================================

  const fetchAppointments = async (
    showLoader = true
  ) => {
    try {
      setDashboardError("");

      if (showLoader) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const token =
        sessionStorage.getItem("adminToken");

      if (!token) {
        setDashboardError(
          "Admin session expired. Please login again."
        );

        return;
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(
        response.data.appointments || []
      );
    } catch (error) {
      console.error(
        "Dashboard fetch error:",
        error
      );

      setDashboardError(
        error.response?.data?.message ||
          "Unable to load appointments. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // ==========================================
  // FETCH ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ==========================================
  // DATE HELPERS
  // ==========================================

  const getTodayDate = () => {
    const today = new Date();

    const year =
      today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ==========================================
  // TIME FORMATTER
  // ==========================================

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
  // TODAY'S APPOINTMENTS
  // ==========================================

  const todayString =
    getTodayDate();

  const todaysAppointments =
    appointments
      .filter(
        (appointment) =>
          appointment.date ===
          todayString
      )
      .sort((a, b) =>
        a.time.localeCompare(
          b.time
        )
      );

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "confirmed"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "cancelled"
    ).length;

  // ==========================================
  // DASHBOARD DATE
  // ==========================================

  const currentDashboardDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="admin-layout">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <AdminSidebar />

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="admin-main">

        <div className="admin-dashboard">

          <div className="admin-dashboard-container">

            {/* ==================================
                HEADER
            ================================== */}

            <div className="admin-header-top">

              <div className="admin-header">

                <p className="admin-subtitle">
                  URBAN EDGE
                </p>

                <h1>
                  Admin Dashboard
                </h1>

                <p>
                  Manage salon appointments
                  and customer bookings.
                </p>

              </div>

              <div className="admin-header-actions">

                <a
                  href="/"
                  className="view-website-btn"
                >
                  👁 View Website
                </a>

                <span className="admin-date">
                  {currentDashboardDate}
                </span>

                <button
                  type="button"
                  className="refresh-btn"
                  onClick={() =>
                    fetchAppointments(false)
                  }
                  disabled={
                    isRefreshing ||
                    isLoading
                  }
                >
                  {isRefreshing
                    ? "Refreshing..."
                    : "↻ Refresh"}
                </button>

              </div>

            </div>

            {/* ==================================
                ERROR
            ================================== */}

            {dashboardError && (
              <div
                className="dashboard-error"
                role="alert"
              >
                <span>
                  {dashboardError}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    fetchAppointments()
                  }
                >
                  Try Again
                </button>
              </div>
            )}

            {/* ==================================
                STATISTICS
            ================================== */}

            <div className="dashboard-stats">

              {/* Total */}

              <div className="stat-card">
                <span className="stat-label">
                  Total Appointments
                </span>

                <strong>
                  {totalAppointments}
                </strong>
              </div>

              {/* Pending */}

              <div className="stat-card">
                <span className="stat-label">
                  Pending
                </span>

                <strong>
                  {pendingAppointments}
                </strong>
              </div>

              {/* Confirmed */}

              <div className="stat-card">
                <span className="stat-label">
                  Confirmed
                </span>

                <strong>
                  {confirmedAppointments}
                </strong>
              </div>

              {/* Completed */}

              <div className="stat-card">
                <span className="stat-label">
                  Completed
                </span>

                <strong>
                  {completedAppointments}
                </strong>
              </div>

              {/* Cancelled */}

              <div className="stat-card">
                <span className="stat-label">
                  Cancelled
                </span>

                <strong>
                  {cancelledAppointments}
                </strong>
              </div>

            </div>

            {/* ==================================
                TODAY'S APPOINTMENTS
            ================================== */}

            <section className="today-appointments">

              <div className="today-header">

                <div>

                  <p className="admin-subtitle">
                    DAILY SCHEDULE
                  </p>

                  <h2>
                    Today's Appointments
                  </h2>

                </div>

                <span className="today-count">
                  {todaysAppointments.length}{" "}
                  {todaysAppointments.length ===
                  1
                    ? "Appointment"
                    : "Appointments"}
                </span>

              </div>

              {/* No appointments */}

              {todaysAppointments.length ===
              0 ? (
                <div className="today-empty">

                  <span>
                    📅
                  </span>

                  <p>
                    No appointments scheduled
                    for today.
                  </p>

                </div>
              ) : (
                /* Appointment List */

                <div className="today-list">

                  {todaysAppointments.map(
                    (appointment) => (

                      <div
                        className="today-appointment"
                        key={appointment._id}
                      >

                        {/* Time */}

                        <div className="today-time">

                          <strong>
                            {formatAppointmentTime(
                              appointment.time
                            )}
                          </strong>

                        </div>

                        {/* Customer */}

                        <div className="today-customer">

                          <strong>
                            {appointment.name}
                          </strong>

                          <span>
                            {appointment.service}
                          </span>

                        </div>

                        {/* Status */}

                        <span
                          className={`appointment-status status-${appointment.status}`}
                        >
                          {appointment.status
                            ?.charAt(0)
                            .toUpperCase() +
                            appointment.status?.slice(
                              1
                            )}
                        </span>

                      </div>

                    )
                  )}

                </div>
              )}

            </section>

            {/* ==================================
                APPOINTMENTS
            ================================== */}

            <AppointmentList
              appointments={
                appointments
              }
              setAppointments={
                setAppointments
              }
              isLoading={
                isLoading
              }
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;