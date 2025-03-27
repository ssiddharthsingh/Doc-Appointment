// FeedbackCarousel.js
import React from "react";
import Rating from "react-rating-stars-component";
import Slider from "react-slick";
import "../css/feedbackCarousel.css"; // Import the CSS file

const FeedbackCarousel = ({ feedbacks, carouselSettings }) => {
  const renderFeedbacks = () => {
    return (
      <div className="feedback-carousel">
        <Slider
          {...carouselSettings}
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
        >
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="patient-pic-container">
                <img
                  className="patient-pic"
                  src={`http://localhost:4500/images/${feedback.pic}`}
                  alt="Patient"
                />
              </div>

              <div className="rating-container">
                <Rating
                  value={feedback.starRating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
              </div>
              <p className="feedback">"{feedback.feedback}"</p>
              <p className="patientname">- {feedback.patientName}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const CustomNextArrow = ({ onClick }) => (
    <button className="custom-arrow custom-arrow-next" onClick={onClick}>
      {">"}
    </button>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <button className="custom-arrow custom-arrow-prev" onClick={onClick}>
      {"<"}
    </button>
  );

  return <>{renderFeedbacks()}</>;
};

export default FeedbackCarousel;
