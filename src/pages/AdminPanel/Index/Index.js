import React, { useEffect, useState } from "react";

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import PAdminInfoBox from "../../../Components/AdminPanel/PAdminInfoBox/PAdminInfoBox";

import "./Index.css";

export default function Index() {
  const [adminName, setAdminName] = useState("");
  const [infos, setInfos] = useState([]);
  const [lastUsers, setLastUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pAdminData) => {
        console.log(pAdminData);
        setAdminName(pAdminData.adminName);
        setInfos(pAdminData.infos);
        setLastUsers(pAdminData.lastUsers);
      });
  }, []);

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">
              خوش آمدید,<span class="name">{adminName}</span>
            </span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {infos.map((info) => (
                <PAdminInfoBox {...info} />
              ))}
            </div>
          </div>

          <div class="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">
              <table class="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>ایمیل</th>
                  </tr>
                </thead>
                <tbody>
                  {lastUsers.map((user, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      {/* <td>09123443243</td> */}
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
