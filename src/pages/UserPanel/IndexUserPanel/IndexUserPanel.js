import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/authContext";
import LinkBox from "../../../Components/UserPanel/LinkBox/LinkBox";

function IndexUserPanel() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <div class="col-9">
        <div class="main">
          <div class="main__title">
            <span class="main__title-text">
              سلام{" "}
              <span class="main__title-name">
                {authContext?.userInfo?.name}
              </span>
              ، به پنل کاربری خوش اومدی
            </span>
          </div>
          <p class="main__desc">
            از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
            مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
            کاربری و کلمه عبور خود را ویرایش کنید.
          </p>
          <div class="main__links">
            <div class="row">
              <LinkBox title="سفارش‌ها" href="orders" />
              <LinkBox title="دوره های خریداری شده" href="buyed" />
              <LinkBox title="کیف پول من" href="money" />
              <LinkBox title="جزئیات حساب کاربری" href="infos" />
              <LinkBox title="تیکت های پشتیبانی" href="tickets" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexUserPanel;
