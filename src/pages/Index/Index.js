import React from 'react'

import Header from '../../Components/Header/Header';
import Landing from '../../Components/Landing/Landing';
import "./Index.css"
import LastCourses from '../../Components/LastCourses/LastCourses';
import AboutUs from '../../Components/AboutUs/AboutUs';
import PopularCourses from '../../Components/PopularCourses/PopularCourses';
import PresellCourse from '../../Components/PresellCourse/PresellCourse';
import NewArticles from '../../Components/NewArticles/NewArticles';
import Footer from '../../Components/Footer/Footer';

function Index() {
    return (
        <>
            <Header />
            <LastCourses />
            <AboutUs />
            <PopularCourses />
            <PresellCourse />
            <NewArticles />
            <Footer />
        </>
    )
}

export default Index;