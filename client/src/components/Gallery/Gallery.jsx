import "./Gallery.css";

const galleryImages = [
  {
    id: 1,
    image: "/gallery-1.jpg",
    title: "Classic Haircut",
  },
  {
    id: 2,
    image: "/gallery-2.jpg",
    title: "Premium Styling",
  },
  {
    id: 3,
    image: "/gallery-3.jpg",
    title: "Beard Grooming",
  },
  {
    id: 4,
    image: "/gallery-4.jpg",
    title: "Modern Look",
  },
  {
    id: 5,
    image: "/gallery-5.jpg",
    title: "Professional Grooming",
  },
  {
    id: 6,
    image: "/gallery-6.jpg",
    title: "Urban Style",
  },
];

function Gallery() {
  return (
    <section className="gallery" id="gallery">

      <div className="gallery-container">

        <div className="gallery-header">
          <p className="section-subtitle">
            OUR WORK
          </p>

          <h2>Style &amp; Craftsmanship</h2>

          <p>
            Take a look at some of our latest grooming
            and styling work.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <div className="gallery-item" key={item.id}>

              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
              />

              <div className="gallery-overlay">
                <h3>{item.title}</h3>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

export default Gallery;