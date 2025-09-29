import React, { useEffect, useState } from 'react';

import './Contact.css';
import Topbar from '../../Components/Topbar/Topbar';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";

import validFuncs from "../../validators/validators";
import { toast } from 'react-toastify';

function Contact() {

    const [formIsValid, setFormIsValid] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        body: ''
    });

    const changeInputValue = (field, value) => {
        setFormData(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const handleValidation = () => {
        const nameValid = validFuncs.requiredValidator(formData.name) &&
            validFuncs.minValidator(formData.name, 3) &&
            validFuncs.maxValidator(formData.name, 20);

        const emailValid = validFuncs.requiredValidator(formData.email) &&
            validFuncs.maxValidator(formData.email, 37) &&
            validFuncs.emailValidator(formData.email);

        const phoneValid = validFuncs.requiredValidator(formData.phone) &&
            validFuncs.minValidator(formData.phone, 3) &&
            validFuncs.maxValidator(formData.phone, 20);

        const bodyValid = validFuncs.requiredValidator(formData.body) &&
            validFuncs.minValidator(formData.body, 3) &&
            validFuncs.maxValidator(formData.body, 300);

        const isFormValid = nameValid && emailValid && phoneValid && bodyValid;
        setFormIsValid(isFormValid);
    };

    useEffect(() => {
        handleValidation();
    }, [formData])


    const registerContact = (e) => {
        e.preventDefault();
        const dataForSend = {
            name: formData.name || '',
            email: formData.email || '',
            phone: formData.phone || '',
            body: formData.body || '',
        }
        fetch(`http://localhost:4000/v1/contact`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForSend)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(result => {
                toast.success("عملیات با موفقیت انجام شد 😃", {
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
            })
            .catch((err) => {
                console.log('ERROR: ', err);
                toast.error("عملیات ناموفق بود", {
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
            })
    }

    return (
        <>
            <Topbar />
            <Navbar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ارتباط با ما</span>
                    <span className="login__subtitle">
                        نظر یا انتقادتو بنویس برامون :)
                    </span>
                    <form action="#" className="login-form">
                        <div className="login-form__username login-form__parent">
                            <Input
                                // onInputHandler={onInputHandler}
                                type="input"
                                id="name"
                                className="login-form__username-input"
                                placeholder="نام و نام خانوادگی"
                                value={formData.name}
                                onChange={(value) => {
                                    changeInputValue('name', value)
                                }}
                                validations={[
                                    validFuncs.requiredValidator(formData.name),
                                    validFuncs.minValidator(formData.name, 3),
                                    validFuncs.maxValidator(formData.name, 20),
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password login-form__parent">
                            <Input
                                type="input"
                                id="email"
                                className="login-form__password-input"
                                placeholder="آدرس ایمیل"
                                value={formData.email}
                                onChange={(value) => {
                                    changeInputValue('email', value)
                                }}
                                validations={[
                                    validFuncs.requiredValidator(formData.email),
                                    validFuncs.maxValidator(formData.email, 37),
                                    validFuncs.emailValidator(formData.email)
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__phone-number login-form__parent">
                            <Input
                                type="input"
                                id="phone"
                                className="login-form__password-input"
                                placeholder="شماره تماس"
                                value={formData.phone}
                                onChange={(value) => {
                                    changeInputValue('phone', value)
                                }}
                                validations={[
                                    validFuncs.requiredValidator(formData.phone),
                                    validFuncs.minValidator(formData.phone, 3),
                                    validFuncs.maxValidator(formData.phone, 20),
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-phone"></i>
                        </div>
                        <div className="login-form__text login-form__parent">
                            <Input
                                element='textarea'
                                type="textarea"
                                id="body"
                                className="login-form__password-textarea"
                                placeholder="متن خود را وارد کنید"
                                value={formData.body}
                                onChange={(value) => {
                                    changeInputValue('body', value)
                                }}
                                validations={[
                                    validFuncs.requiredValidator(formData.body),
                                    validFuncs.minValidator(formData.body, 3),
                                    validFuncs.maxValidator(formData.body, 300),
                                ]}
                            />
                        </div>
                        <Button className='login-form__btn' onClick={(e) => { registerContact(e) }} disabled={!formIsValid}>
                            <span className="login-form__btn-text">ارسال</span>
                        </Button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Contact;