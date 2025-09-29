import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Topbar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import TitleSection from '../../Components/TitleSection/TitleSection';
import CourseBox from '../../Components/CourseBox/CourseBox';
import ArticleBox from '../../Components/ArticleBox/ArticleBox';

function Search() {
    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);
    const { value } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${value}`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.allResultCourses)
                setArticles(data.allResultArticles)
            })
    }, [value])

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="courses">
                <div className="container">
                    <TitleSection desc='سکوی پرتاب برای برنامه نویس شدن' title='نتیجه دوره ها برای جستجوی شما' />
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {
                                    courses.length === 0 ? (
                                        <div className="alert alert-warning">دوره ای برای جستجوی شما  پیدا نشد</div>
                                    ) : (
                                        courses.map(course => (
                                            <CourseBox {...course} />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="courses">
                <div className="container">
                    <TitleSection desc='پیش به سوی ارتقای دانش ' title='نتیجه مقاله ها برای جستجوی شما' />
                    <div className="article_content">
                        <div className="container">
                            <div className="row">
                                {
                                    articles.length === 0 ? (
                                        <div className="alert alert-warning">مقاله ای برای جستجوی شما پیدا نشد</div>
                                    ) : (
                                        articles.map(article => (
                                            <ArticleBox {...article} />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Search