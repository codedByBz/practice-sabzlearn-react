import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";

import "./Courses.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const { page } = useParams();
  const navigate = useNavigate();
  const [coursesSliced, setCoursesSliced] = useState([]);

  useEffect(() => {
    if (!page) {
      navigate(`/courses/1`, { replace: true });
    }
  }, [page, navigate]);

  const fetchCourses = async () => {
    await fetch(`http://localhost:4000/v1/courses`)
      .then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
      })
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "/courses",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  coursesSliced.map(course => (
                    <CourseBox {...course} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section >
      <Pagination
        array={courses}
        setSlicedArray={setCoursesSliced}
        count={3}
        pathname='/courses'
      />
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
}
