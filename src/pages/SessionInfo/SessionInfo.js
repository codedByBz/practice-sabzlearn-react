import React, { useEffect, useState } from 'react';

import './SessionInfo.css';

import { Link, useParams } from 'react-router-dom';
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

function SessionInfo() {
    const { courseName, sessionID } = useParams();
    const [session, setSession] = useState({});
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(data => {
                setSession(data.session);
                setSessions(data.sessions);
            })
    }, [courseName, sessionID])
    return (
        <>
            <Topbar />
            <Navbar />

            <section class="content">
                <div class="col-4">
                    <div class="sidebar">
                        <div class="sidebar__header">
                            <a class="sidebar__header-link" href="#">
                                <i class="sidebar__haeder-icon fa fa-book-open"></i>
                                لیست جلسات
                            </a>
                        </div>
                        <div class="sidebar-topics">
                            <div class="sidebar-topics__item">
                                <ul class="sidebar-topics__list">
                                    {sessions.map(sessionData => (
                                        sessionData.free === 1 ? (
                                            <Link to={`/${courseName}/${sessionData._id}`}>
                                                <li class={`sidebar-topics__list-item ${session._id == sessionData._id ? 'active' : ''}`}>
                                                    <div class="sidebar-topics__list-right">
                                                        <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                                                        <span class="sidebar-topics__list-item-link">
                                                            {sessionData.title}
                                                        </span>
                                                    </div>
                                                    <div class="sidebar-topics__list-left">
                                                        <span class="sidebar-topics__list-item-time">
                                                            {sessionData.time}
                                                        </span>
                                                    </div>
                                                </li>
                                            </Link>
                                        ) : (
                                            <li class={`sidebar-topics__list-item ${session._id == sessionData._id ? 'active' : ''}`}>
                                                <div class="sidebar-topics__list-right">
                                                    <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                                                    <span class="sidebar-topics__list-item-link">
                                                        {sessionData.title} <i className='fa fa-lock'></i>
                                                    </span>
                                                </div>
                                                <div class="sidebar-topics__list-left">
                                                    <span class="sidebar-topics__list-item-time">
                                                        {sessionData.time}
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="episode">
                        <div class="episode-haeder">
                            <div class="episode-header__right">
                                <Link class="episode-header__right-back-link" to={`/course-info/${courseName}`}>
                                    <i class="episode-header__right-back-icon fa fa-angle-right"></i>
                                    <div class="episode-header__right-home">
                                        <a class="episode-header__right-home-link">
                                            به دوره خانه بروید
                                        </a>
                                        <i class="episode-header__right-home-icon fa fa-home"></i>
                                    </div>
                                </Link>
                            </div>
                            <div class="episode-header__left">
                                <i class="episode-header__left-icon fa fa-play-circle"></i>
                                <span class="episode-header__left-text">
                                    {" "}
                                    امیدواریم از آموزش های ما لذت ببرید
                                </span>
                            </div>
                        </div>
                        <div class="episode-content">
                            <video
                                class="episode-content__video"
                                controls
                                src={`http://localhost:4000/courses/covers/${session.video}`}
                            ></video>
                            <a class="episode-content__video-link" href="#">
                                دانلود ویدئو
                            </a>
                            <div class="episode-content__bottom">
                                <a class="episode-content__backward" href="#">
                                    <i class="episode-content__backward-icon fa fa-arrow-right"></i>
                                    قبلی
                                </a>
                                <a class="episode-content__forward" href="#">
                                    بعدی
                                    <i class="episode-content__backward-icon fa fa-arrow-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default SessionInfo