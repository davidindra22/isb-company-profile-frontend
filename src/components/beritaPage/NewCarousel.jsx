// src/components/NewsCarousel.jsx
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function NewsCarousel({ image, id }) {
  if (!image || image.length === 0) {
    return <div>tidak ada gambar</div>;
  }
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Carousel
        key={id}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={3000}
        stopOnHover
        swipeable
        emulateTouch
      >
        {image.map((src, index) => (
          <div key={index}>
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${src}`}
              alt={`Foto ${index + 1}`}
              style={{
                maxHeight: "350px", // batasi tinggi
                width: "100%",
                objectFit: "cover", // menjaga proporsi gambar
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
