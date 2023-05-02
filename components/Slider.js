import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Slider() {
  return (
    <section className="relative mt-7 shadow-2xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="/images/slider-1.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-2.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-3.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/images/slider-4.jpeg" alt="" />
        </div>
      </Carousel>
    </section>
  );
}
