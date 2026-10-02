import TestimonialCard from "../TestimonialCard/TestimonialCard";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    service: "Classic Haircut",
    review:
      "Amazing service and attention to detail. The haircut was exactly what I wanted.",
    rating: 5,
  },
  {
    id: 2,
    name: "Amit Patil",
    service: "Beard Styling",
    review:
      "Great atmosphere and professional staff. Definitely coming back again.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Deshmukh",
    service: "Premium Grooming",
    review:
      "One of the best grooming experiences I have had. Highly recommended.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonials-container">

        <div className="testimonials-header">
          <p className="section-subtitle">
            CLIENT REVIEWS
          </p>

          <h2>What Our Clients Say</h2>

          <p>
            Real experiences from clients who trust Urban Edge
            for their grooming needs.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default Testimonials;