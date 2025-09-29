import React, { useContext, useMemo, useState } from "react";

import "./CommentInput.css";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function CommentInput({ courseName, comments }) {
  const authContext = useContext(AuthContext);

  const [textareaValue, setTextareaValue] = useState("");
  const [commentScore, setCommentScore] = useState("-1");

  const changeTextareaValueHandler = (e) => {
    setTextareaValue(e.target.value);
  };

  function submitComment() {
    if (commentScore == "-1" || textareaValue.trim() === "") {
      swal({
        icon: "error",
        title: "مقادیر وارد شده نامعتبره",
        button: "فهمیدم",
      });
    } else {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      fetch(`http://localhost:4000/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify({
          body: textareaValue,
          courseShortName: courseName,
          score: commentScore,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.success(" ثبت کامنت با موفقیت ارسال شد", {
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
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          [...comments].reverse().map((comment) => {
            console.log(comment);
            return (
              <div className="comments__item">
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN"
                          ? "ادمین"
                          : comment.creator.role === "USER"
                          ? "کاربر"
                          : "نا معلوم"}
                      </span>
                      <span className="comments__question-score">
                        {comment.score == 5
                          ? "عالی"
                          : comment.score == 4
                          ? "خیلی خوب"
                          : comment.score == 3
                          ? "خوب"
                          : comment.score == 2
                          ? "ضعیف"
                          : comment.score == 1
                          ? "بد"
                          : ""}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                </div>
                {/* answer comment */}
                {comment.answerContent && (
                  <div className="comments__item mt-4 mb-0">
                    <div className="comments__question">
                      <div className="comments__question-header">
                        <div className="comments__question-header-right">
                          <span className="comments__question-name comment-name">
                            {comment.answerContent.creator.name}
                          </span>
                          <span className="comments__question-status comment-status">
                            {comment.answerContent.creator.role === "ADMIN"
                              ? "ادمین"
                              : comment.creator.role === "USER"
                              ? "کاربر"
                              : "نا معلوم"}
                          </span>
                          <span className="comments__question-date comment-date">
                            {comment.answerContent.createdAt.slice(0, 10)}
                          </span>
                        </div>
                        <div className="comments__question-header-left">
                          <a
                            className="comments__question-header-link comment-link"
                            href="#"
                          >
                            پاسخ
                          </a>
                        </div>
                      </div>
                      <div className="comments__question-text">
                        <p className="comments__question-paragraph comment-paragraph">
                          {comment.answerContent.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* answer comment */}
              </div>
            );
          })
        )}

        {authContext.isLogin ? (
          <>
            <div className="comments__rules">
              <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
              <span className="comments__rules-item">
                <i className="fas fa-check comments__rules-icon"></i>
                اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
                انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند
                شد
              </span>
              <span className="comments__rules-item">
                <i className="fas fa-check comments__rules-icon"></i>
                دیدگاه های نامرتبط به دوره تایید نخواهد شد.
              </span>
              <span className="comments__rules-item">
                <i className="fas fa-check comments__rules-icon"></i>
                سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
              </span>
              <span className="comments__rules-item">
                <i className="fas fa-check comments__rules-icon"></i>
                از درج دیدگاه های تکراری پرهیز نمایید.
              </span>
            </div>
            <div className="comments__respond">
              <div className="comments__score">
                <span className="comments__score-title">امتیاز شما</span>
                {/* <div className="comments__score-input">
                                        <span className="comments__score-input-text">
                                            امتیاز خود را انتخاب کنید
                                        </span>
                                        <i className="fas fa-angle-down	 comments__input-icon"></i>
                    </div> */}
                <select
                  className="form-select form-control font-bold"
                  onChange={(e) => {
                    setCommentScore(e.target.value);
                  }}
                >
                  <option value="-1">امتیاز خود را انتخاب کنید</option>
                  <option value="5">عالی</option>
                  <option value="4">خیلی خوب</option>
                  <option value="3">خوب</option>
                  <option value="2">ضعیف</option>
                  <option value="1">بد</option>
                </select>
              </div>
              <div className="comments__respond-content">
                <div className="comments__respond-title">دیدگاه شما *</div>
                <textarea
                  className="comments__score-input-respond"
                  onChange={changeTextareaValueHandler}
                >
                  {textareaValue}
                </textarea>
              </div>
              <button
                type="submit"
                className="comments__respond-btn"
                onClick={() => submitComment()}
              >
                ارسال
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="alert alert-danger">
              اگر میخواهید کامنتی بفرستید، باید ابتدا{" "}
              <Link to="/login">ورود</Link> کنید
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CommentInput;
