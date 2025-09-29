import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";

import validationsFunc from "../../validators/validators";

import AuthContext from "../../context/authContext";

import { toast } from "react-toastify";

import "./Register.css";

export default function Register() {
  const [formIsValid, setFormIsValid] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    name: '',
    password: '',
  });

  const authContext = useContext(AuthContext);


  const changeInputValue = (field, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const resetInputs = () => {
    setFormData({
      username: '',
      phone: '',
      email: '',
      name: '',
      password: '',
    })
  }

  function registerNewUser(e) {
    e.preventDefault();

    let newUserData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.password
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData)
    })
      .then(res => {
        if (res.ok) {
          toast.success("ثبت نام با موفقیت انجام شد", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: true,
            rtl: true,
            theme: "colored",
            style: { backgroundColor: "forestgreen", color: "#fff", fontFamily: 'IRANSans' },
            progressStyle: { backgroundColor: "#FF0000" },
          });
          return res.json();
        } else {
          if (res.status === 403) {
            toast.error("این شماره تماس مسدود شده", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              rtl: true,
              theme: "colored",
              style: { backgroundColor: "#D32F2F", color: "#fff", fontFamily: 'IRANSans' },
            });
            return null;
          }
          return res.json();
        }
      })
      .then(result => {
        if (result) {
          authContext.login(result?.accessToken, result?.user);
          resetInputs();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("مشکلی در ثبت نام پیش آمده", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: true,
          theme: "colored",
          style: { backgroundColor: "#D32F2F", color: "#fff", fontFamily: 'IRANSans' },
        });
      });
  }

  const handleValidation = () => {
    const usernameValid =
      validationsFunc.requiredValidator(formData.username) &&
      validationsFunc.minValidator(formData.username, 3) &&
      validationsFunc.maxValidator(formData.username, 20) &&
      validationsFunc.usernameValidator(formData.username);

    const phoneValid =
      validationsFunc.requiredValidator(formData.email) &&
      validationsFunc.minValidator(formData.email, 8) &&
      validationsFunc.maxValidator(formData.email, 25);


    const emailValid =
      validationsFunc.requiredValidator(formData.email) &&
      validationsFunc.minValidator(formData.email, 8) &&
      validationsFunc.maxValidator(formData.email, 25) &&
      validationsFunc.emailValidator(formData.email);

    const nameValid =
      validationsFunc.requiredValidator(formData.name) &&
      validationsFunc.minValidator(formData.name, 6) &&
      validationsFunc.maxValidator(formData.name, 25);

    const passwordValid =
      validationsFunc.requiredValidator(formData.password) &&
      validationsFunc.minValidator(formData.password, 8) &&
      validationsFunc.maxValidator(formData.password, 20);

    setFormIsValid(usernameValid && phoneValid && emailValid && nameValid && passwordValid);
  };


  useEffect(() => {
    handleValidation();
  }, [formData]);

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form" onSubmit={registerNewUser}>
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.email}
                placeholder="آدرس ایمیل"
                onChange={(value) => {
                  changeInputValue('email', value)
                  handleValidation();
                }}
                validations={[
                  validationsFunc.requiredValidator(formData.email),
                  validationsFunc.minValidator(formData.email, 8),
                  validationsFunc.maxValidator(formData.email, 25),
                  validationsFunc.emailValidator(formData.email)
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.username}
                placeholder="نام کاربری"
                onChange={(value) => {
                  changeInputValue('username', value)
                  handleValidation();
                }}
                validations={[
                  validationsFunc.requiredValidator(formData.username),
                  validationsFunc.minValidator(formData.username, 3),
                  validationsFunc.maxValidator(formData.username, 20),
                  validationsFunc.usernameValidator(formData.username)
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.phone}
                placeholder="شماره تلفن"
                onChange={(value) => {
                  changeInputValue('phone', value)
                  handleValidation();
                }}
                validations={[
                  validationsFunc.requiredValidator(formData.phone),
                  validationsFunc.minValidator(formData.phone, 6),
                  validationsFunc.maxValidator(formData.phone, 25),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.name}
                placeholder="نام و نام خانوادگی"
                onChange={(value) => {
                  changeInputValue('name', value)
                  handleValidation();
                }}
                validations={[
                  validationsFunc.requiredValidator(formData.name),
                  validationsFunc.minValidator(formData.name, 6),
                  validationsFunc.maxValidator(formData.name, 25),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                className="login-form__username-input"
                element="input"
                value={formData.password}
                placeholder="رمز"
                onChange={(value) => {
                  changeInputValue('password', value)
                  handleValidation();
                }}
                validations={[
                  validationsFunc.requiredValidator(formData.password),
                  validationsFunc.minValidator(formData.password, 8),
                  validationsFunc.maxValidator(formData.password, 20),
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button className="login-form__btn" type="submit" disabled={!formIsValid} >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
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
