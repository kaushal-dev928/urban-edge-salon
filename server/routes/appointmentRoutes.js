import express from "express";

import {
  createAppointment,
  getAppointments,
  getBookedSlots,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// CUSTOMER BOOKING
// ==========================================

// Public
router.post(
  "/",
  createAppointment
);


// ==========================================
// AVAILABLE / BOOKED SLOTS
// ==========================================

// Public
router.get(
  "/slots",
  getBookedSlots
);


// ==========================================
// ADMIN APPOINTMENTS
// ==========================================

// Protected
router.get(
  "/",
  protect,
  getAppointments
);


// Protected
router.put(
  "/:id",
  protect,
  updateAppointment
);


// Protected
router.delete(
  "/:id",
  protect,
  deleteAppointment
);


export default router;