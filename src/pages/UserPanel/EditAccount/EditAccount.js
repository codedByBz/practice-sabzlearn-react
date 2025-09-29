import React, { useContext, useEffect, useState } from "react";

import AuthContext from "./../../../context/authContext";

import swal from "sweetalert";

import "./EditAccount.css";

export default function EditAccount() {
  const authContext = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    const userInfo = authContext.userInfo;
    setPhone(userInfo.phone);
    setName(userInfo.name);
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [authContext]);

  const editAccount = (e) => {
    e.preventDefault();
    if (
      phone != "" &&
      name != "" &&
      userName != "" &&
      email != "" &&
      password.length >= 8
    ) {
      const newUserInfo = {
        phone,
        name,
        username: userName,
        email,
        password,
      };
      fetch(`http://localhost:4000/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(newUserInfo),
      }).then((res) => {
        if (res.ok) {
          swal({
            icon: "success",
            title: "اطلاعات شما با موفقیت ویرایش شد",
            button: "فهمیدم",
          }).then(() => {
            window.location.href = "/my-account";
          });
          return res.json();
        }
      });
    } else {
      swal({
        icon: "error",
        title: "لطفا تمام مقادیر را وارد کنید",
        button: "باشه",
      });
    }
  };

  return (
    <div class="col-9">
      <div class="edit">
        <form class="edit__form" action="#">
          <div class="edit__personal">
            <div class="row">
              <div class="col-12">
                <label class="edit__label">شماره موبایل *</label>
                <input
                  class="edit__input"
                  type="number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>

              <div class="col-12">
                <label class="edit__label">نام و نام خانوادگی *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
              <div class="col-12">
                <label class="edit__label">نام کاربری (نمایشی) *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
                <span class="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div class="col-12">
                <label class="edit__label">آدرس ایمیل *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div class="edit__password">
            <span class="edit__password-title">تغییر گذرواژه</span>
            <div class="row">
              <div class="col-12">
                <label class="edit__label">گذرواژه جدید</label>
                <input
                  class="edit__input"
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="گذرواژه جدید"
                />
              </div>
            </div>
          </div>
          <button class="edit__btn" type="submit" onClick={editAccount}>
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
