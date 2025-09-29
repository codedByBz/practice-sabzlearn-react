import React, { useEffect, useState } from "react";

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

function AdminComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((allComments) => {
        console.log(allComments);
        setComments(allComments);
      });
  };

  const deleteComment = (commentID) => {
    swal({
      icon: "warning",
      title: "آیا از حذف اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              icon: "success",
              title: "کامنت با موفقیت حذف شد",
              buttons: "فهمیدم",
            }).then(() => {
              fetchComments();
            });
          }
        });
      }
    });
  };

  const showBodyComment = (body) => {
    swal({
      text: body,
    });
  };

  const banUser = (userID) => {
    swal({
      icon: "warning",
      title: "آیا از بن کردن این کاربر اطمینان دارید؟",
      buttons: ["نه، دستم خورد", "اره"],
    }).then((reslut) => {
      if (reslut) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              icon: "success",
              title: "کاربر مورد نظر با موفقیت بن شد",
            });
          }
        });
      }
    });
  };

  const answerComment = (commentID) => {
    swal({
      title: "پاسخ را بنویسید",
      content: "input",
      button: {
        text: "ارسال",
        closeModal: false,
      },
    }).then((value) => {
      if (value == null) {
        return;
      }
      if (value.trim() === "") {
        swal({
          icon: "error",
          title: "پاسخ نمی‌تونه خالی باشه!",
          text: "لطفاً یه چیزی بنویس :)",
          button: "باشه",
        });
      } else {
        const commentAnswer = {
          body: value.trim(),
          score: 5,
        };
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentAnswer),
        })
          .then((res) => {
            console.log(res);
            if (res.ok) {
              swal.close();
              swal({
                icon: "success",
                title: "با موفقیت ارسال شد",
                button: "باشه",
              }).then(() => {
                fetchComments();
              });
            } else {
              swal({
                icon: "error",
                title: "مشکلی در ارسال پاسخ پیش آمد",
                button: "باشه",
              });
            }
          })
          .catch((err) => {
            swal({
              icon: "error",
              title: "مشکل سرور برای ارسال پاسخ پیش آمد",
              button: "باشه",
            });
          });
      }
    });
  };

  const acceptComment = (commentID) => {
    fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }).then((res) => {
      if (res.ok) {
        swal({
          icon: "success",
          title: "تایید موفق بود",
        }).then(() => {
          fetchComments();
        });
      }
    });
  };

  const rejectComment = (commentID) => {
    fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }).then((res) => {
      if (res.ok) {
        swal({
          icon: "success",
          title: "رد تایید موفق بود",
        }).then(() => {
          fetchComments();
        });
      }
    });
  };

  const showAnswerComment = (answerText) => {
    swal({
      text: answerText,
      button: "بستن",
    });
  };

  return (
    <>
      <DataTable title="کامنت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>برای دوره‌:</th>
              <th>امتیاز وارد شده</th>
              <th>متن کامنت</th>
              <th>متن پاسخ کامنت</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {[...comments].reverse().map((comment, index) => {
              return (
                <tr>
                  <td
                    className={comment.answer === 1 ? "active" : "not-active"}
                  >
                    {index + 1}
                  </td>
                  <td>{comment.creator.name}</td>
                  <td>{comment.course}</td>
                  <td>{comment.score}</td>
                  <td>
                    <button
                      className="btn btn-primary edit-btn"
                      onClick={() => {
                        showBodyComment(comment.body);
                      }}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    {comment.answerContent ? (
                      <button
                        className="btn btn-primary edit-btn"
                        onClick={() => {
                          showAnswerComment(comment.answerContent.body);
                        }}
                      >
                        مشاهده
                      </button>
                    ) : (
                      <span>ندارد</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-success edit-btn"
                      onClick={() => {
                        answerComment(comment._id);
                      }}
                    >
                      پاسخ
                    </button>
                  </td>
                  <td>
                    {comment.answer === 0 ? (
                      <button
                        className="btn btn-success edit-btn"
                        onClick={() => {
                          acceptComment(comment._id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger edit-btn"
                        onClick={() => {
                          rejectComment(comment._id);
                        }}
                      >
                        رد تایید
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger edit-btn"
                      onClick={() => {
                        deleteComment(comment._id);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger edit-btn"
                      onClick={() => {
                        banUser(comment.creator._id);
                      }}
                    >
                      بن
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}

export default AdminComments;
