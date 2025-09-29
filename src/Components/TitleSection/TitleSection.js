import React from 'react';

import './TitleSection.css';
import { Link } from 'react-router-dom';

function TitleSection({ title, desc, btnTitle, linkBtn }) {
    return (
        <>
            <div className="courses-header">
                <div className="courses-header__right">
                    <span className="courses-header__title title">{title}</span>
                    <span className="courses-header__text">{desc}</span>
                </div>
                <div className="courses-header__left">
                    {
                        btnTitle ? (
                            <Link to={linkBtn ? linkBtn : '/'} className="courses-header__link">
                                {btnTitle}
                                <i className="fas fa-arrow-left courses-header__icon"></i>
                            </Link>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default TitleSection