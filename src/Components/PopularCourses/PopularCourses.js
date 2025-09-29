import React, { useEffect, useState } from 'react';

import './PopularCourses.css';
import TitleSection from '../TitleSection/TitleSection';
import CourseBox from '../CourseBox/CourseBox';

import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";

function PopularCourses() {

    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/popular`)
            .then(res => res.json())
            .then(data => {
                setPopularCourses(data);
            })
    }, [])

    return (
        <div className="popular">
            <div className="container">
                <TitleSection title="محبوب ترین دوره ها" />
                <div className="course-content">
                    <div className="container">
                        <div className="row">
                            <Swiper
                                slidesPerView={3.3}
                                spaceBetween={15}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                                className='mySwiper'
                                dir='rtl'
                            >
                                {
                                    popularCourses.map(popularCourse => (
                                        <SwiperSlide>
                                            <CourseBox {...popularCourse} isSwiper={true} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCourses;