/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Profile.css";
import "/src/index.css";

export const StoryHighlights = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    showSlide(currentIndex);
  }, [currentIndex, slides]);

  const showSlide = (index) => {
    const slidesContainer = document.querySelector(".slides");
    const slideWidth = slidesContainer.offsetWidth;

    const offset = -index * slideWidth;
    slidesContainer.style.transform = `translateX${offset}px`;
    console.log(slidesContainer.offsetWidth);
  };

  function handlePrev() {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    showSlide(currentIndex);
  }

  function handleNext() {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    showSlide(currentIndex);
  }

  // RETURN
  return (
    <div className="highlights">
      <div className="highlight-container">
        <div className="slides">
          {slides.map((slide, index) => (
            <div className="highlight" key={index}>
              <img src={slide} height={"100%"} width={"100%"} alt="highlight" />
            </div>
          ))}

          {/* nav arrows, disalble-temp */}
          {/* <label className="prev" onClick={handlePrev}>
            &#10094;
          </label>
          <label className="next" onClick={handleNext}>
            &#10095;
          </label> */}
        </div>
      </div>
    </div>
  );
};
