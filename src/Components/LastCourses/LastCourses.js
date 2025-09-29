import React, { useEffect, useState } from 'react'

import TitleSection from '../../Components/TitleSection/TitleSection';
import CourseBox from '../../Components/CourseBox/CourseBox';
import './LastCourses.css';

function LastCourses() {

    const [courses, setCourses] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(res => res.json())
            .then(data => {
                setCourses([...data].splice(0, 6));
            });
    }, [])

    return (
        <>
            <div className="courses">
                <div className="container">
                    <TitleSection title="جدیدترین دوره ها" desc="سکوی پرتاپ شما به سمت موفقیت" btnTitle="تمامی دوره ها" linkBtn='/courses/1' />
                    <div className="course-content">
                        <div className="container">
                            <div className="row">
                                {
                                    courses?.map(course => {
                                        return (
                                            <CourseBox key={course.id} {...course} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LastCourses