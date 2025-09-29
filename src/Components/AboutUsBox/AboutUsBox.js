import React from 'react'

import './AboutUsBox.css';

function AboutUsBox({ iconName, title, desc }) {
    return (
        <>
            <div className="col-6">
                <div className="about-us__box">
                    <div className="about-us__box-right">
                        <i className={`${iconName} about-us__icon`}></i>
                    </div>
                    <div className="about-us__box-left">
                        <span className="about-us__box-title">{title}</span>
                        <span className="about-us__box-text">{desc}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUsBox