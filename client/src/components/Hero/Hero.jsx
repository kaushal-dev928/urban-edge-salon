import heroImage from "../../assets/hero-salon.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      {/* Background Image */}
      <img
        src={heroImage}
        alt="Urban Edge Men's Salon"
        className="hero-image"
      />

      {/* Dark Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-container">
        <div className="hero-content">

          <p className="hero-subtitle">
            PREMIUM MEN'S SALON
          </p>

          <h1>
            LOOK SHARP.
            <br />
            FEEL CONFIDENT.
          </h1>

          <p className="hero-description">
            Premium grooming and styling services designed
            for the modern man.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="hero-btn primary-btn">
              Book Appointment
            </a>

            <a href="#services" className="hero-btn secondary-btn">
              Explore Services
            </a>
          </div>

          <a 
            href="/admin/login"
            className="admin-login-link"
          >
            Admin Login
          </a>

        </div>
      </div>

    </section>
  );
}

export default Hero;