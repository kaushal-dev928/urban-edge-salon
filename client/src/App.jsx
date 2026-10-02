import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Testimonials from "./components/Testimonials/Testimonials";
import Booking from "./components/Booking/Booking";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";


function Home() {

  // Service selected from ServiceCard
  const [selectedService, setSelectedService] =
    useState("");


  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Services
        setSelectedService={setSelectedService}
      />

      <Gallery />

      <Testimonials />

      <Booking
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />

      <Contact />

      <Footer />
    </>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Main Website */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* Protected Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;