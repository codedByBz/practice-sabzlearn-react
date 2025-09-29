import React, { useEffect, useState } from "react";

import "./SendTicket.css";

import swal from "sweetalert";

function SendTicket() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [ticketData, setTicketData] = useState({
    departmentID: "-1",
    departmentSubID: "-1",
    title: "",
    priority: 3,
    body: "",
    course: "-1",
  });

  useEffect(() => {
    fetchDepartment();
    fetchCourses();
  }, []);

  const fetchDepartment = () => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((allDepartments) => {
        console.log(allDepartments);
        setDepartments(allDepartments);
      });
  };

  const fetchCourses = () => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  };

  const changeDepartmentHandler = (departmentID) => {
    setTicketData((prev) => ({ ...prev, departmentID }));
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((allDepartmentsSubs) => {
        setDepartmentsSubs(allDepartmentsSubs);
      });
  };

  const sendTicket = (e) => {
    e.preventDefault();
    if (
      ticketData.departmentID != "-1" &&
      ticketData.departmentSubID != "-1" &&
      ticketData.title != "" &&
      ticketData.body != ""
    ) {
      const newTicketData = {
        departmentID: ticketData.departmentID,
        departmentSubID: ticketData.departmentSubID,
        title: ticketData.title,
        priority: ticketData.priority,
        body: ticketData.body,
        course: ticketData.course != "-1" ? ticketData.course : null,
      };
      fetch(`http://localhost:4000/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(newTicketData),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              icon: "success",
              title: "تیکت با موفقیت ارسال شد",
              button: "فهمیدم",
            });
            return res.json();
          }
        })
        .then((result) => {
          console.log(result);
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
    <>
      <div class="col-9">
        <div class="ticket">
          <div class="ticket-header">
            <span class="ticket-header__title">ارسال تیکت جدید</span>
            <a class="ticket-header__link" href="#">
              همه تیکت ها
            </a>
          </div>
          <form class="ticket-form" action="#">
            <div class="row">
              <div class="col-6">
                <label class="ticket-form__label">
                  دپارتمان را انتخاب کنید:
                </label>
                <select
                  class="ticket-form__select"
                  onChange={(e) => {
                    changeDepartmentHandler(e.target.value);
                  }}
                >
                  <option class="ticket-form__option" value="-1">
                    لطفا یک مورد را انتخاب نمایید.
                  </option>
                  {departments.map((department) => (
                    <option value={department._id}>{department.title}</option>
                  ))}
                </select>
              </div>
              <div class="col-6">
                <label class="ticket-form__label">
                  نوع تیکت را انتخاب کنید:
                </label>
                <select
                  class="ticket-form__select"
                  onChange={(e) => {
                    setTicketData((prev) => ({
                      ...prev,
                      departmentSubID: e.target.value,
                    }));
                  }}
                >
                  <option class="ticket-form__option">
                    لطفا یک مورد را انتخاب نمایید.
                  </option>
                  {departmentsSubs.map((sub) => (
                    <option value={sub._id}>{sub.title}</option>
                  ))}
                </select>
              </div>
              <div class="col-6">
                <label class="ticket-form__label">
                  عنوان تیکت را وارد کنید:
                </label>
                <input
                  class="ticket-form__input"
                  type="text"
                  value={ticketData.title}
                  onChange={(e) => {
                    setTicketData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div class="col-6">
                <label class="ticket-form__label">
                  سطح اولویت تیکت را انتخاب کنید:
                </label>
                <select
                  class="ticket-form__select"
                  onChange={(e) => {
                    setTicketData((prev) => ({
                      ...prev,
                      priority: +e.target.value,
                    }));
                  }}
                >
                  <option value={3}>کم</option>
                  <option value={2}>متوسط</option>
                  <option value={1}>بالا</option>
                </select>
              </div>
              {ticketData.departmentSubID === "68308ad47fb0670f1cf12979" && (
                <div class="col-6">
                  <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                  <select
                    class="ticket-form__select"
                    onChange={(e) => {
                      setTicketData((prev) => ({
                        ...prev,
                        course: e.target.value,
                      }));
                    }}
                  >
                    <option class="ticket-form__option" value="-1">
                      لطفا یک مورد را انتخاب نمایید.
                    </option>
                    {courses.map((course) => (
                      <option value={course._id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div class="col-12">
                <label class="ticket-form__label">
                  محتوای تیکت را وارد نمایید:
                </label>
                <textarea
                  class="ticket-form__textarea"
                  value={ticketData.body}
                  onChange={(e) => {
                    setTicketData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <div class="col-12">
                <div class="ticket-form__file">
                  <span class="ticket-form__file-max">
                    حداکثر اندازه: 6 مگابایت
                  </span>
                  <span class="ticket-form__file-format">
                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                  </span>
                  <input class="ticket-form__file-input" type="file" />
                </div>
              </div>
              <div class="col-12">
                <button class="ticket-form__btn" onClick={sendTicket}>
                  <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                  ارسال تیکت
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendTicket;
