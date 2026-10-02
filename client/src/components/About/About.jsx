import "./About.css";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-container">

        {/* Image */}
        <div className="about-image-wrapper">
          <img
            src="/about-salon.png"
            alt="Urban Edge Men's Salon"
            className="about-image"
          />
        </div>

        {/* Content */}
        <div className="about-content">

          <p className="about-subtitle">
            ABOUT URBAN EDGE
          </p>

          <h2>
            MORE THAN A HAIRCUT.
            <br />
            IT'S YOUR STYLE.
          </h2>

          <p className="about-text">
            At Urban Edge, we believe grooming is more than
            just looking good. It's about confidence, comfort
            and expressing your personal style.
          </p>

          <p className="about-text">
            Our experienced professionals combine modern
            techniques with premium products to give every
            client a grooming experience they can feel proud of.
          </p>

          <div className="about-stats">

            <div className="stat">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>

            <div className="stat">
              <h3>1000+</h3>
              <p>Happy Clients</p>
            </div>

            <div className="stat">
              <h3>10+</h3>
              <p>Premium Services</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;