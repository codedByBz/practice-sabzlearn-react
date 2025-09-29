import React, { useEffect, useState } from 'react';

import './PresellCourse.css';
import TitleSection from '../TitleSection/TitleSection';
import CourseBox from '../CourseBox/CourseBox';

import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";

function PresellCourse() {
    const [presellCourses, setPresellCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/presell`)
            .then(res => res.json())
            .then(data => {
                setPresellCourses(data)
            })
    }, [])

    return (
        <div className="presell">
            <div className="container">
                <TitleSection
                    title="دوره های در حال پیش فروش"
                />
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
                                    presellCourses.map(presellCourse => (
                                        <SwiperSlide>
                                            <CourseBox {...presellCourse} isSwiper={true} />
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

export default PresellCourse;