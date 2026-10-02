import "./TestimonialCard.css";

function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card">

      <div className="testimonial-stars">
        {"★".repeat(testimonial.rating)}
      </div>

      <p className="testimonial-review">
        "{testimonial.review}"
      </p>

      <div className="testimonial-user">

        <div className="testimonial-avatar">
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <h3>{testimonial.name}</h3>
          <span>{testimonial.service}</span>
        </div>

      </div>

    </article>
  );
}

export default TestimonialCard;