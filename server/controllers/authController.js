import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Create JWT
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 5. Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};