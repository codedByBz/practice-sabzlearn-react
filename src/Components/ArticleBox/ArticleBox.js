import React from 'react';

import { Link } from 'react-router-dom';

import './ArticleBox.css';

function ArticleBox(props) {
    return (
        props.publish === 1 && (

            <div className="col-4">
                <div className="article-card">
                    <div className="article-card__header">
                        <Link to={`/article/${props.shortName}`} className="article-card__link-img">
                            <img src={"http://localhost:4000/courses/covers/" + props.cover} className="article-card__img" alt="Article Cover" />
                        </Link>
                    </div>
                    <div className="article-card__content">
                        <Link to={`/article/${props.shortName}`} className="article-card__link">
                            {props.title}
                        </Link>
                        <p className="article-card__text">
                            {props.description}
                        </p>
                        <Link to={`/article/${props.shortName}`} className="article-card__btn">بیشتر بخوانید</Link>
                    </div>
                </div>
            </div>
        )
    )
}

export default ArticleBox