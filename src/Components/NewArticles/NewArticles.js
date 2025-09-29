import React, { useEffect, useState } from 'react';

import './NewArticles.css';
import TitleSection from '../TitleSection/TitleSection';
import ArticleBox from '../ArticleBox/ArticleBox';

function NewArticles() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/articles`)
            .then(res => res.json())
            .then(articlesData => {
                setArticles(articlesData);
            })
    }, [])

    return (
        <section className="articles">
            <div className="container">
                <TitleSection
                    title="جدیدترین مقاله ها"
                    btnTitle="تمامی مقاله ها"
                    linkBtn='/articles/1'
                />
                <div className="articles__content">
                    <div className="row">
                        {
                            [...articles].slice(0, 3).map(article => (
                                <ArticleBox {...article} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewArticles;