import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination/Pagination";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

import { useNavigate, useParams } from "react-router-dom";

import "./Articles.css";

export default function Articles() {

    const [articles, setArticles] = useState([]);
    const { page } = useParams();
    const navigate = useNavigate();
    const [articlesSliced, setArticlesSliced] = useState([]);

    useEffect(() => {
        if (!page) {
            navigate(`/articles/1`, { replace: true });
        }
    }, [page, navigate]);

    const fetchArticles = async () => {
        await fetch(`http://localhost:4000/v1/articles`)
            .then(res => res.json())
            .then(data => {
                setArticles(data)
            })
    }

    useEffect(() => {
        fetchArticles();
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
                        title: "مقالات",
                        to: "/articles",
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
                                    articlesSliced.map(article => (
                                        <ArticleBox {...article} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Pagination
                array={articles}
                setSlicedArray={setArticlesSliced}
                count={3}
                pathname='/articles'
            />
            {/* <!--------------------------------  Courses-Section  --------------------------------> */}

            <Footer />
        </>
    );
}
