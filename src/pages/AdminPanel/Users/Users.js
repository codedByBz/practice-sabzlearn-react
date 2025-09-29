import React, { useEffect, useState } from "react";

import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users/${userID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        fetchUsers();
      });
  };

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("کاربر با موفقیت بن شد 😃", {
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
        } else {
          toast.error("عملیات ناموفق بود", {
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
        }
      })
      .catch((err) => {
        toast.error("خطای شبکه‌ای رخ داد 😢", {
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
        console.error("banUser error:", err);
      });
  };

  const changeUserRol = (userID) => {
    swal({
      title: "نقش جدید را وارد کنید",
      text: "(فقط میتوانید ADMIN و یا USER را وارد کنید)",
      content: "input",
      button: "تغییر",
    }).then((value) => {
      if (value !== null && (value === "USER" || value === "ADMIN")) {
        fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: value,
            id: userID,
          }),
        }).then((res) => {
          if (res.ok) {
            swal({
              icon: "success",
              title: "تغییر نقش موفق انجام شد",
              button: "اوکی",
            }).then(() => {
              fetchUsers();
            });
          }
        });
      } else {
        swal({
          icon: "error",
          title: "لطفا مقدار معتبر وارد کنید",
          buttons: "باشه",
        });
      }
    });
  };

  return (
    <>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر نقش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role === "ADMIN" ? "ادمین" : "کاربر"}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => {
                      changeUserRol(user._id);
                    }}
                  >
                    تغییر
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => {
                      banUser(user._id);
                    }}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
