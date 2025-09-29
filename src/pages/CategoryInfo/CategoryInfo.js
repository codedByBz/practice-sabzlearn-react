import React, { useEffect, useState } from 'react'

import "./CategoryInfo.css";
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Pagination/Pagination';
import Footer from '../../Components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryInfo() {

    const { categoryName, page } = useParams();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [coursesSliced, setCoursesSliced] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [status, setStatus] = useState('');
    const [titleStatus, setTitleStatus] = useState('مرتب سازی پیش فرض');

    const [searchValue, setSearchValue] = useState('');

    const [displayCoursesType, setDisplayCoursesType] = useState('row');

    useEffect(() => {
        if (!page) {
            navigate(`/category-info/${categoryName}/1`, { replace: true });
        }
    }, [page, categoryName, navigate]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                setCourses(data);
                setFilteredCourses(data);
                setStatus('default');
                setTitleStatus('مرتب سازی پیش فرض')
            })
    }, [categoryName])


    const changeStatusHandler = (newStatus) => {
        setStatus(newStatus);
    }

    useEffect(() => {
        switch (status) {
            case 'money':
                const notFreeCourses = courses.filter(course => course.price !== 0);
                setFilteredCourses(notFreeCourses);
                navigate(`/category-info/${categoryName}/1`, { replace: true });
                break;
            case 'free':
                const freeCourses = courses.filter(course => course.price === 0);
                setFilteredCourses(freeCourses)
                navigate(`/category-info/${categoryName}/1`, { replace: true });
                break;
            default:
                setFilteredCourses(courses);
                break;
        }
    }, [status])



    useEffect(() => {
        const filterCourses = courses.filter(course => course.name.toLowerCase().includes(searchValue.toLowerCase()));
        if (page !== 1) {
            navigate(`/category-info/${categoryName}/1`, { replace: true });
        }
        setFilteredCourses(filterCourses)
    }, [searchValue])

    return (
        <>
            <Topbar />
            <Navbar />
            <section className="courses">
                <div className="container">
                    {
                        courses.length !== 0 && (
                            <div className="courses-top-bar">

                                <div className="courses-top-bar__right">
                                    <div className={`courses-top-bar__row-btn ${displayCoursesType == 'row' ? "courses-top-bar__icon--active" : ""} `} onClick={() => { setDisplayCoursesType('row') }}>
                                        <i className="fas fa-border-all courses-top-bar__icon"></i>
                                    </div>
                                    <div className={`courses-top-bar__column-btn  ${displayCoursesType == 'column' ? "courses-top-bar__icon--active" : ""} `} onClick={() => { setDisplayCoursesType('column') }}>
                                        <i className="fas fa-align-left courses-top-bar__icon"></i>
                                    </div>

                                    <div className="courses-top-bar__selection">
                                        <span className="courses-top-bar__selection-title">
                                            {/* مرتب سازی پیش فرض */}
                                            {titleStatus}
                                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                                        </span>
                                        <ul className="courses-top-bar__selection-list">
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('default')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی پیش فرض</li>
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('money')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی بر اساس پولی</li>
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('free')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی بر اساس رایگان</li>
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('last')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی بر اساس آخرین</li>
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('little')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی بر اساس ارزان ترین</li>
                                            <li className="courses-top-bar__selection-item" onClick={(e) => {
                                                changeStatusHandler('big')
                                                setTitleStatus(e.target.textContent)
                                            }}>
                                                مرتب سازی بر اساس گران ترین</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="courses-top-bar__left">
                                    <form action="#" className="courses-top-bar__form">
                                        <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." onChange={(e) => { setSearchValue(e.target.value) }} />
                                        <i className="fas fa-search courses-top-bar__search-icon"></i>
                                    </form>
                                </div>

                            </div>
                        )
                    }

                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {
                                    courses.length !== 0 ? (
                                        <>
                                            {
                                                coursesSliced.length !== 0 ? (
                                                    displayCoursesType == 'row' ? (
                                                        coursesSliced?.map(course => (
                                                            <CourseBox {...course} />
                                                        ))
                                                    ) : (
                                                        coursesSliced?.map(course => (
                                                            <div className="col-12">
                                                                <div className="course-box">
                                                                    <div className="course__box-header">
                                                                        <div className="course__box-right">
                                                                            <a
                                                                                className="course__box-right-link"
                                                                                href="#"
                                                                            >
                                                                                <img
                                                                                    src={"http://localhost:4000/courses/covers/" + course.cover}
                                                                                    className="course__box-right-img"
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                        <div className="course__box-left">
                                                                            <div className="course__box-left-top">
                                                                                <a
                                                                                    href="#"
                                                                                    className="course__box-left-link"
                                                                                >
                                                                                    {course.name}
                                                                                </a>
                                                                            </div>
                                                                            <div className="course__box-left-center">
                                                                                <div className="course__box-left-teacher">
                                                                                    <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                                                                    <span className="course__box-left-name">
                                                                                        محمد امین سعیدی راد
                                                                                    </span>
                                                                                </div>
                                                                                <div className="course__box-left-stars">
                                                                                    <span className="course__box-left-star">
                                                                                        <img src="/images/svgs/star_fill.svg" />
                                                                                    </span>
                                                                                    <span className="course__box-left-star">
                                                                                        <img src="/images/svgs/star_fill.svg" />
                                                                                    </span>
                                                                                    <span className="course__box-left-star">
                                                                                        <img src="/images/svgs/star_fill.svg" />
                                                                                    </span>
                                                                                    <span className="course__box-left-star">
                                                                                        <img src="/images/svgs/star_fill.svg" />
                                                                                    </span>
                                                                                    <span className="course__box-left-star">
                                                                                        <img src="/images/svgs/star_fill.svg" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="course__box-left-bottom">
                                                                                <div className="course__box-left-des">
                                                                                    <p>{course.description}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="course__box-footer">
                                                                                <div className="course__box-footer-right">
                                                                                    <i className="course__box-footer-icon fa fa-users"></i>
                                                                                    <span className="course__box-footer-count">
                                                                                        202
                                                                                    </span>
                                                                                </div>
                                                                                <span className="course__box-footer-left">
                                                                                    0
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                ) : (
                                                    <div className="alert alert-warning">دوره ای برای این نوع دسته بندی وجود ندارد</div>
                                                )
                                            }
                                            <Pagination
                                                array={filteredCourses}
                                                setSlicedArray={setCoursesSliced}
                                                count={3}
                                                pathname={`/category-info/${categoryName}`}
                                            />
                                        </>
                                    ) : (
                                        <div className="alert alert-warning">
                                            هیچ دوره ای برای این دسته بندی وجود ندارد
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CategoryInfo;