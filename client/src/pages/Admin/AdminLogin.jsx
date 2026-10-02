import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      const { token, admin } = response.data;

      // Store JWT
      sessionStorage.setItem(
        "adminToken",
        token
      );

      // Store admin information
      sessionStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );

      // Keep authentication state
      sessionStorage.setItem(
        "adminAuthenticated",
        "true"
      );

      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <p>URBAN EDGE</p>

          <h1>Admin Login</h1>

          <span>
            Sign in to manage appointments
          </span>
        </div>

        {errorMessage && (
          <div className="admin-login-error">
            {errorMessage}
          </div>
        )}

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@urbanedge.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <a
          href="/"
          className="back-website-link"
        >
          ← Back to Website
        </a>

      </div>
    </div>
  );
}

export default AdminLogin;