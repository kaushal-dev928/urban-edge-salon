import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Booking.css";


// ==========================================
// GET TODAY'S DATE
// ==========================================

const getLocalDate = () => {
  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


// ==========================================
// AVAILABLE TIME SLOTS
// ==========================================

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];


function Booking({
  selectedService,
  setSelectedService,
}) {

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });


  // ==========================================
  // MESSAGE STATE
  // ==========================================

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");


  // ==========================================
  // LOADING STATE
  // ==========================================

  const [isLoading, setIsLoading] =
    useState(false);


  // ==========================================
  // BOOKED SLOTS STATE
  // ==========================================

  const [bookedTimes, setBookedTimes] =
    useState([]);

  const [slotsLoading, setSlotsLoading] =
    useState(false);


  // ==========================================
  // SELECTED SERVICE EFFECT
  // ==========================================

  useEffect(() => {

    if (selectedService) {

      setFormData(
        (previousData) => ({
          ...previousData,
          service: selectedService,
        })
      );

    }

  }, [selectedService]);


  // ==========================================
  // FETCH BOOKED SLOTS
  // ==========================================

  useEffect(() => {

    const fetchBookedSlots =
      async () => {

        // No date selected
        if (!formData.date) {

          setBookedTimes([]);

          return;

        }


        try {

          setSlotsLoading(true);


          const response =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/api/appointments/slots`,
              {
                params: {
                  date:
                    formData.date,
                },
              }
            );


          setBookedTimes(
            response.data.bookedTimes ||
              []
          );


          // If selected time
          // is already booked
          if (
            formData.time &&
            response.data.bookedTimes?.includes(
              formData.time
            )
          ) {

            setFormData(
              (previousData) => ({
                ...previousData,
                time: "",
              })
            );

          }

        } catch (error) {

          console.error(
            "Fetch booked slots error:",
            error
          );

          setBookedTimes([]);

        } finally {

          setSlotsLoading(false);

        }

      };


    fetchBookedSlots();

  }, [formData.date]);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    let updatedValue = value;


    // Phone number
    if (name === "phone") {

      updatedValue =
        value
          .replace(/\D/g, "")
          .slice(0, 10);

    }


    setFormData(
      (previousData) => ({
        ...previousData,
        [name]:
          updatedValue,
      })
    );


    setErrorMessage("");
    setSuccessMessage("");

  };


  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const validateForm = () => {

    // Name
    if (
      !formData.name.trim()
    ) {

      return (
        "Please enter your full name."
      );

    }


    if (
      formData.name.trim()
        .length < 2
    ) {

      return (
        "Name must contain at least 2 characters."
      );

    }


    // Phone
    const phoneRegex =
      /^[6-9]\d{9}$/;


    if (
      !phoneRegex.test(
        formData.phone.trim()
      )
    ) {

      return (
        "Enter a valid 10-digit Indian mobile number."
      );

    }


    // Email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      formData.email.trim() &&
      !emailRegex.test(
        formData.email.trim()
      )
    ) {

      return (
        "Please enter a valid email address."
      );

    }


    // Service
    if (
      !formData.service
    ) {

      return (
        "Please select a service."
      );

    }


    // Date
    if (
      !formData.date
    ) {

      return (
        "Please select an appointment date."
      );

    }


    // Past date
    const today =
      getLocalDate();


    if (
      formData.date < today
    ) {

      return (
        "You cannot book an appointment in the past."
      );

    }


    // Time
    if (
      !formData.time
    ) {

      return (
        "Please select an appointment time."
      );

    }


    // Working hours
    if (
      formData.time < "09:00" ||
      formData.time > "21:00"
    ) {

      return (
        "Appointments are available between 9:00 AM and 9:00 PM."
      );

    }


    // Today's past time
    if (
      formData.date === today
    ) {

      const now =
        new Date();


      const currentTime =
        `${String(
          now.getHours()
        ).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;


      if (
        formData.time <=
        currentTime
      ) {

        return (
          "Please choose a future appointment time."
        );

      }

    }


    // Check booked slot
    if (
      bookedTimes.includes(
        formData.time
      )
    ) {

      return (
        "This time slot is already booked. Please choose another time."
      );

    }


    return "";

  };


  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    // Prevent double click
    if (isLoading) {

      return;

    }


    setErrorMessage("");
    setSuccessMessage("");


    // Validate
    const validationError =
      validateForm();


    if (validationError) {

      setErrorMessage(
        validationError
      );

      return;

    }


    setIsLoading(true);


    try {

      // ==========================================
      // SEND BOOKING TO BACKEND
      // ==========================================

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/appointments`,
          formData
        );


      console.log(
        "Booking response:",
        response.data
      );


      // ==========================================
      // SUCCESS
      // ==========================================

      setSuccessMessage(
        "Your appointment has been booked successfully!"
      );


      // ==========================================
      // RESET FORM
      // ==========================================

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });


      // Clear service
      setSelectedService("");


      // Clear booked times
      setBookedTimes([]);

    } catch (error) {

      console.error(
        "Booking error:",
        error
      );


      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );

    } finally {

      setIsLoading(false);

    }

  };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      className="booking"
      id="booking"
    >

      <div className="booking-container">


        {/* =====================================
            BOOKING INFORMATION
        ===================================== */}

        <div className="booking-info">

          <p className="section-subtitle">
            BOOK YOUR VISIT
          </p>


          <h2>
            Ready for a Fresh Look?
          </h2>


          <p>
            Book your appointment today and
            experience premium grooming
            tailored for you.
          </p>


          <div className="booking-features">


            <div className="booking-feature">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Professional Stylists
                </h3>

                <p>
                  Experienced grooming
                  professionals.
                </p>

              </div>

            </div>


            <div className="booking-feature">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Premium Products
                </h3>

                <p>
                  Quality products for the
                  best results.
                </p>

              </div>

            </div>


            <div className="booking-feature">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Easy Booking
                </h3>

                <p>
                  Choose your preferred date
                  and time.
                </p>

              </div>

            </div>


          </div>

        </div>


        {/* =====================================
            BOOKING FORM
        ===================================== */}

        <div className="booking-form-wrapper">


          {/* Error */}

          {errorMessage && (

            <div
              className="booking-error"
              role="alert"
            >

              ✕ {errorMessage}

            </div>

          )}


          {/* Success */}

          {successMessage && (

            <div
              className="booking-success"
              role="status"
            >

              ✓ {successMessage}

            </div>

          )}


          <form
            className="booking-form"
            onSubmit={handleSubmit}
          >


            {/* Name + Phone */}

            <div className="form-row">


              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  maxLength="10"
                  inputMode="numeric"
                  required
                />

              </div>


            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* Service */}

            <div className="form-group">

              <label htmlFor="service">
                Select Service
              </label>

              <select
                id="service"
                name="service"
                value={
                  formData.service
                }
                onChange={
                  handleChange
                }
                required
              >

                <option value="">
                  Choose a service
                </option>

                <option value="Classic Haircut">
                  Classic Haircut
                </option>

                <option value="Beard Styling">
                  Beard Styling
                </option>

                <option value="Haircut + Beard">
                  Haircut + Beard
                </option>

                <option value="Hair Spa">
                  Hair Spa
                </option>

                <option value="Face Cleanup">
                  Face Cleanup
                </option>

                <option value="Premium Grooming">
                  Premium Grooming
                </option>

              </select>

            </div>


            {/* Date */}

            <div className="form-group">

              <label htmlFor="date">
                Select Date
              </label>

              <input
                id="date"
                type="date"
                name="date"
                min={
                  getLocalDate()
                }
                value={
                  formData.date
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* Time Slots */}

            <div className="form-group">

              <label>
                Select Time
              </label>


              {slotsLoading && (

                <p className="slots-loading">
                  Checking available slots...
                </p>

              )}


              {!slotsLoading &&
                formData.date && (
                  <div className="time-slots">

                    {TIME_SLOTS.map(
                      (time) => {

                        const isBooked =
                          bookedTimes.includes(
                            time
                          );


                        const isSelected =
                          formData.time ===
                          time;


                        return (

                          <button
                            key={time}
                            type="button"
                            className={`time-slot ${
                              isSelected
                                ? "selected"
                                : ""
                            } ${
                              isBooked
                                ? "booked"
                                : ""
                            }`}
                            disabled={
                              isBooked
                            }
                            onClick={() => {

                              setFormData(
                                (
                                  previousData
                                ) => ({
                                  ...previousData,
                                  time,
                                })
                              );


                              setErrorMessage("");
                              setSuccessMessage("");

                            }}
                          >

                            {time}

                            {isBooked && (
                              <span>
                                Booked
                              </span>
                            )}

                          </button>

                        );

                      }
                    )}

                  </div>
                )}


              {!formData.date && (

                <p className="slot-helper">
                  Please select a date to see
                  available times.
                </p>

              )}

            </div>


            {/* Message */}

            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Any special request?"
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
              ></textarea>

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="booking-submit"
              disabled={
                isLoading ||
                slotsLoading
              }
            >

              {isLoading
                ? "Booking..."
                : "Book Appointment →"}

            </button>


          </form>

        </div>

      </div>

    </section>

  );
}


export default Booking;