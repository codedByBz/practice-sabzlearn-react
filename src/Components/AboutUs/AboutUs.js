import React from 'react'

import TitleSection from '../TitleSection/TitleSection';
import './AboutUs.css';
import AboutUsBox from '../AboutUsBox/AboutUsBox';

function AboutUs() {
    return (
        <div className="about-us">
            <div className="container">
                <TitleSection title="ما چه کمکی بهتون میکنیم؟" desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست" />

                <div className="container">
                    <div className="row">
                        <AboutUsBox iconName="far fa-copyright" title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !" />
                        <AboutUsBox iconName="fas fa-leaf" title="اجازه تدریس" desc="به هر مدرسی رو نمیده. چون کیفیت براش مهمه !" />
                        <AboutUsBox iconName="fas fa-gem" title="دوره پولی و رایگان" desc="براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده" />
                        <AboutUsBox iconName="fas fa-crown" title="اهمیت به کاربر" desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;