import React, { useEffect, useState } from "react";

import "./UserCourses.css";
import { Link } from "react-router-dom";

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const [filterCoursesType, setFilterCoursesType] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetch(`http://localhost:4000/v1/users/courses`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      });
  };

  useEffect(() => {
    console.log(filterCoursesType);
    if (filterCoursesType === "all") {
      console.log("yes all");
      setFilteredCourses(courses);
    } else if (filterCoursesType === "free") {
      const newCourses = [...courses].filter((course) => course.price == 0);
      setFilteredCourses(newCourses);
    } else if (filterCoursesType === "money") {
      const newCourses = [...courses].filter((course) => course.price != 0);
      setFilteredCourses(newCourses);
    }
  }, [filterCoursesType]);

  return (
    <>
      {" "}
      <div class="col-9">
        <div class="courses">
          <div class="courses-header__panel">
            <span class="courses-header__title">دوره های ثبت نام شده</span>
            <ul class="courses-header__list">
              <li
                class="courses-header__item"
                onClick={() => {
                  setFilterCoursesType("all");
                }}
              >
                <a
                  class={`courses-header__link__panel ${
                    filterCoursesType === "all"
                      ? "courses-header__link-active"
                      : ""
                  }`}
                >
                  همه دوره ها
                </a>
              </li>
              <li class="courses-header__item">
                <a
                  class={`courses-header__link__panel ${
                    filterCoursesType === "free"
                      ? "courses-header__link-active"
                      : ""
                  }`}
                  onClick={() => {
                    setFilterCoursesType("free");
                  }}
                >
                  دوره های رایگان
                </a>
              </li>
              <li class="courses-header__item">
                <a
                  class={`courses-header__link__panel ${
                    filterCoursesType === "money"
                      ? "courses-header__link-active"
                      : ""
                  }`}
                  onClick={() => {
                    setFilterCoursesType("money");
                  }}
                >
                  دوره های پولی
                </a>
              </li>
            </ul>
          </div>
          <div class="main">
            <div class="row">
              {filteredCourses.map((course) => (
                <div class="col-12">
                  <>
                    <div class="main__box">
                      <div class="main__box-right">
                        <Link
                          to={`/course-info/${course.course.shortName}`}
                          class="main__box-img-link"
                        >
                          <img
                            class="main__box-img img-fluid"
                            src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                          />
                        </Link>
                      </div>
                      <div class="main__box-left">
                        <Link
                          to={course.course.shortName}
                          class="main__box-title"
                        >
                          {course.course.name}
                        </Link>
                        <div class="main__box-bottom">
                          <div class="main__box-all">
                            <span class="main__box-all-text">وضعیت:</span>
                            <span class="main__box-all-value">
                              {course.course.isComplete === 1
                                ? "تکمیل"
                                : "در حال برگزاری"}
                            </span>
                          </div>
                          <div class="main__box-completed">
                            <span class="main__box-completed-text">مبلغ:</span>
                            <span class="main__box-completed-value">
                              {course.price == 0
                                ? "رایگان"
                                : course.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              ))}
              {!filteredCourses.length && (
                <div className="alert alert-danger">
                  دوره‌ای جهت نمایش برای این فیلتر وجود ندارد
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCourses;
