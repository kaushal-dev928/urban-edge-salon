import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>URBAN EDGE</h2>

          <p>
            Premium grooming for the modern man.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-links">
          <h3>Services</h3>

          <a href="#services">Haircut</a>
          <a href="#services">Beard Styling</a>
          <a href="#services">Hair Spa</a>
          <a href="#services">Face Cleanup</a>
          <a href="#booking">Book Appointment</a>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Google">G</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Urban Edge Men's Salon.
          All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;