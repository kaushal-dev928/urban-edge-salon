import ServiceCard from "../ServiceCard/ServiceCard";
import "./Services.css";

const services = [
  {
    id: 1,
    icon: "✂️",
    name: "Classic Haircut",
    description: "Clean and stylish haircut tailored to your look.",
    price: 300,
  },
  {
    id: 2,
    icon: "🧔",
    name: "Beard Styling",
    description: "Professional beard shaping and styling.",
    price: 200,
  },
  {
    id: 3,
    icon: "💈",
    name: "Haircut + Beard",
    description: "Complete haircut and beard grooming package.",
    price: 450,
  },
  {
    id: 4,
    icon: "✨",
    name: "Hair Spa",
    description: "Relaxing hair spa treatment with premium products.",
    price: 600,
  },
  {
    id: 5,
    icon: "🧴",
    name: "Face Cleanup",
    description: "Deep cleansing treatment for fresh and healthy skin.",
    price: 350,
  },
  {
    id: 6,
    icon: "👑",
    name: "Premium Grooming",
    description: "Complete premium grooming experience.",
    price: 800,
  },
];

function Services({ setSelectedService }) {
  return (
    <section className="services" id="services">

      <div className="services-container">

        <div className="services-header">
          <p className="section-subtitle">
            WHAT WE OFFER
          </p>

          <h2>Our Premium Services</h2>

          <p>
            From classic cuts to complete grooming,
            we provide everything you need to look your best.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              setSelectedService={setSelectedService}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default Services;