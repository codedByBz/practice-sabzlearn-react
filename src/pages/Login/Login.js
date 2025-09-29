//login.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";

import validFuncs from "../../validators/validators";

import "./Login.css";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeInputValue = (field, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  function loginUser(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: formData.username,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("ورود با موفقیت انجام شد 😃", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: true,
            rtl: true,
            theme: "colored",
            style: {
              backgroundColor: "forestgreen",
              color: "#fff",
              fontFamily: "IRANSans",
            },
            progressStyle: { backgroundColor: "#FF0000" },
          });
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: result.accessToken })
        );
        fetch(`http://localhost:4000/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${result.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((userData) => {
            authContext.login(result.accessToken, userData);
            setTimeout(() => {
              navigate("/my-account");
            }, 3500);
          });
      })
      .catch((err) => {
        toast.error("مقادیر وارد شده نادرست می باشد", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: true,
          theme: "colored",
          style: {
            backgroundColor: "#D32F2F",
            color: "#fff",
            fontFamily: "IRANSans",
          },
        });
      });
  }

  useEffect(() => {
    handleValidation();
  }, [formData]);

  const handleValidation = () => {
    const usernameValid =
      validFuncs.requiredValidator(formData.username) &&
      validFuncs.minValidator(formData.username, 3) &&
      validFuncs.maxValidator(formData.username, 20);

    const passwordValid =
      validFuncs.requiredValidator(formData.password) &&
      validFuncs.minValidator(formData.password, 8) &&
      validFuncs.maxValidator(formData.password, 18);

    const isFormValid = usernameValid && passwordValid;
    setFormIsValid(isFormValid);
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register" onSubmit={loginUser}>
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.username}
                placeholder="نام کاربری یا آدرس ایمیل"
                onChange={(value) => {
                  changeInputValue("username", value);
                  handleValidation();
                }}
                validations={[
                  validFuncs.requiredValidator(formData.username),
                  validFuncs.minValidator(formData.username, 3),
                  validFuncs.maxValidator(formData.username, 20),
                  validFuncs.emailOrUsernameValidator(formData.username),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__password-input"
                element="input"
                value={formData.password}
                placeholder="رمز عبور"
                onChange={(value) => {
                  changeInputValue("password", value);
                  handleValidation();
                }}
                type="password"
                validations={[
                  validFuncs.requiredValidator(formData.password),
                  validFuncs.minValidator(formData.password, 8),
                  validFuncs.maxValidator(formData.password, 18),
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className="login-form__btn"
              type="submit"
              disabled={!formIsValid}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>

            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
