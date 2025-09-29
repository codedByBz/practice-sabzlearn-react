import React from "react";

import "./CourseBox.css";
import { Link } from "react-router-dom";

function CourseBox(props) {
  console.log(props);

  return (
    <>
      <div className="col-4" style={props.isSwiper && { width: "100%" }}>
        <div className="course-box">
          <Link to={`/course-info/${props.shortName}`}>
            <img
              src={`http://localhost:4000/courses/covers/${props.cover}`}
              alt="Course img"
              className="course-box__img"
            />
          </Link>
          <div className="course-box__main">
            <Link
              to={`/course-info/${props.shortName}`}
              className="course-box__title"
            >
              {props.name}
            </Link>
            <div className="course-box__rating-teacher">
              <div className="course-box__teacher">
                <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a href="#" className="course-box__teacher-link">
                  {props.creator}
                </a>
              </div>
              {typeof props.courseAverageScore == "number" && (
                <div className="course-box__rating">
                  {[...Array(5 - props.courseAverageScore)].map((i) => (
                    <img
                      src="/images/svgs/star.svg"
                      alt="rating"
                      className="course-box__star"
                    />
                  ))}
                  {[...Array(props.courseAverageScore)].map((i) => (
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="rating"
                      className="course-box__star"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="course-box__status">
              <div className="course-box__users">
                <i className="fas fa-users course-box__users-icon"></i>
                <span className="course-box__users-text">
                  {props.registers}
                </span>
              </div>
              <span className="course-box__price">
                {props.price == 0
                  ? "رایگان"
                  : Number(props.price).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="course-box__footer">
            <Link
              to={`/course-info/${props.shortName}`}
              className="course-box__footer-link"
            >
              مشاهده اطلاعات
              <i className="fas fa-arrow-left course-box__footer-icon"></i>
            </Link>
          </div>
          <span className="courses-box__discount">{props.discount}%</span>
        </div>
      </div>
    </>
  );
}

export default CourseBox;
