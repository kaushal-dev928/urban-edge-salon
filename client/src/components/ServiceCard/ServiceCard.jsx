import "./ServiceCard.css";

function ServiceCard({ service, setSelectedService }) {
  return (
    <div className="service-card">

      <div className="service-icon">
        {service.icon}
      </div>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-bottom">

        <span className="service-price">
          ₹{service.price}
        </span>

        <a href="#booking" className="service-book-btn"
           onClick={() => setSelectedService(service.name)}
        >
          Book Now →
        </a>

      </div>

    </div>
  );
}

export default ServiceCard;