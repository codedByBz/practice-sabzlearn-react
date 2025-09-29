import React, { useEffect, useState } from "react";

import swal from "sweetalert";

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allTickets) => {
        console.log(allTickets);
        setTickets(allTickets);
      });
  };

  const showBody = (body) => {
    swal({
      title: "متن تیکت:",
      text: body,
      buttons: "بستن",
    });
  };

  const answerTicket = (ticketID) => {
    swal({
      title: "متن پاسخ را بنویسید",
      content: "input",
      buttons: "ارسال",
    }).then((value) => {
      if (value != "" && value !== null) {
        const answerInfo = {
          ticketID,
          body: value,
        };
        fetch(`http://localhost:4000/v1/tickets/answer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(answerInfo),
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              icon: "success",
              title: "پاسخ با موفقیت ارسال شد",
              buttons: "اوکی",
            });
          }
        });
      }
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
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره‌</th>
              <th>اولویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course === null ? "_____" : ticket.course}</td>
                <td>
                  {ticket.priority == "1" && "بالا"}
                  {ticket.priority == "2" && "متوسط"}
                  {ticket.priority == "3" && "پایین"}
                </td>
                <td>
                  <button
                    className="btn btn-primary edit-btn"
                    onClick={() => {
                      showBody(ticket.body);
                    }}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary edit-btn"
                    onClick={() => {
                      answerTicket(ticket._id);
                    }}
                  >
                    پاسخ
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

export default AdminTickets;
