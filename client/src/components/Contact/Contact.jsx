import "./Contact.css";

const contactInfo = [
  {
    id: 1,
    icon: "📍",
    title: "Visit Us",
    value: "Sinhgad Road, Pune",
  },
  {
    id: 2,
    icon: "📞",
    title: "Call Us",
    value: "+91 98765 43210",
  },
  {
    id: 3,
    icon: "✉️",
    title: "Email Us",
    value: "hello@urbanedge.com",
  },
  {
    id: 4,
    icon: "🕐",
    title: "Opening Hours",
    value: "Mon - Sun: 9 AM - 9 PM",
  },
];

function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="contact-container">

        <div className="contact-header">
          <p className="section-subtitle">
            GET IN TOUCH
          </p>

          <h2>Visit Urban Edge</h2>

          <p>
            Have a question or want to book an appointment?
            We're here to help.
          </p>
        </div>

        <div className="contact-grid">

          {contactInfo.map((item) => (
            <div className="contact-card" key={item.id}>

              <div className="contact-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.value}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Contact;