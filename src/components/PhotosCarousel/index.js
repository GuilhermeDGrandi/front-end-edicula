import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PhotoCarousel() {
  const photos = [
    "/photos/photo1.jpg",
    "/photos/photo2.jpg",
    "/photos/photo3.jpg",
    "/photos/photo4.jpg",
    "/photos/photo5.jpg",
    "/photos/photo6.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Slider {...settings}>
        {photos.map((src, index) => (
          <div
            key={index}
            style={{
              height: 450,
              overflow: "hidden",
              borderRadius: 12,
            }}
          >
            <img
              src={src}
              alt={`Foto ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",  
                borderRadius: 12,
                 
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
