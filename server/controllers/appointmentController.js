import Appointment from "../models/Appointment.js";

// ==========================================
// CREATE APPOINTMENT
// ==========================================

export const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      date,
      time,
      message,
    } = req.body;

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (
      !name ||
      !phone ||
      !service ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, service, date and time are required",
      });
    }

    // ==========================================
    // CLEAN VALUES
    // ==========================================

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email?.trim() || "";
    const cleanService = service.trim();
    const cleanDate = date.trim();
    const cleanTime = time.trim();
    const cleanMessage = message?.trim() || "";

    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain at least 2 characters",
      });
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message:
          "Enter a valid 10-digit Indian mobile number",
      });
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    if (cleanEmail) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message:
            "Enter a valid email address",
        });
      }
    }

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const selectedDate = new Date(
      `${cleanDate}T00:00:00`
    );

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid appointment date",
      });
    }

    // ==========================================
    // PAST DATE CHECK
    // ==========================================

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot book an appointment in the past",
      });
    }

    // ==========================================
    // TIME FORMAT VALIDATION
    // ==========================================

    const timeRegex =
      /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(cleanTime)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid appointment time",
      });
    }

    // ==========================================
    // SALON WORKING HOURS
    // 09:00 AM - 09:00 PM
    // ==========================================

    const openingTime = "09:00";
    const closingTime = "21:00";

    if (
      cleanTime < openingTime ||
      cleanTime > closingTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Appointments are available between 9:00 AM and 9:00 PM.",
      });
    }

    // ==========================================
    // TODAY'S PAST TIME CHECK
    // ==========================================

    const currentDate =
      `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(
        now.getDate()
      ).padStart(2, "0")}`;

    if (cleanDate === currentDate) {
      const currentTime =
        `${String(
          now.getHours()
        ).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;

      if (cleanTime <= currentTime) {
        return res.status(400).json({
          success: false,
          message:
            "Please choose a future appointment time",
        });
      }
    }

    // ==========================================
    // DUPLICATE SLOT CHECK
    // ==========================================

    const existingAppointment =
      await Appointment.findOne({
        date: cleanDate,
        time: cleanTime,
        status: {
          $ne: "cancelled",
        },
      });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    // ==========================================
    // CREATE APPOINTMENT
    // ==========================================

    const appointment =
      await Appointment.create({
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        service: cleanService,
        date: cleanDate,
        time: cleanTime,
        message: cleanMessage,
      });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error(
      "Create appointment error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create appointment",
    });
  }
};


// ==========================================
// GET ALL APPOINTMENTS
// ==========================================

export const getAppointments = async (req, res) => {
  try {
    const appointments =
      await Appointment.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error(
      "Get appointments error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch appointments",
    });
  }
};


// ==========================================
// GET BOOKED TIME SLOTS
// ==========================================

export const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;

    // Check date
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    // Find appointments for selected date
    // Cancelled appointments are ignored
    const appointments =
      await Appointment.find({
        date,
        status: {
          $ne: "cancelled",
        },
      }).select("time -_id");

    // Extract only time values
    const bookedTimes =
      appointments.map(
        (appointment) =>
          appointment.time
      );

    res.status(200).json({
      success: true,
      date,
      bookedTimes,
    });
  } catch (error) {
    console.error(
      "Get booked slots error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch booked slots",
    });
  }
};


// ==========================================
// UPDATE APPOINTMENT
// ==========================================

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment =
      await Appointment.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error(
      "Update appointment error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update appointment",
    });
  }
};


// ==========================================
// DELETE APPOINTMENT
// ==========================================

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment =
      await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete appointment error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete appointment",
    });
  }
};