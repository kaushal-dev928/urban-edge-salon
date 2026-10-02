import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
        },

        service: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

export default Appointment;