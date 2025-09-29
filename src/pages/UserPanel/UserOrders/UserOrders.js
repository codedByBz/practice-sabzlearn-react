import React, { useEffect, useState } from "react";

import "./UserOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allOrders) => {
        console.log(allOrders);
        setOrders(allOrders);
      });
  };

  return (
    <>
      <div className="col-9">
        <div className="order">
          <table className="order__table">
            <thead className="order__table-header">
              <tr className="order__table-header-list">
                <th className="order__table-header-item">شناسه</th>
                <th className="order__table-header-item">تاریخ</th>
                <th className="order__table-header-item">وضعیت</th>
                <th className="order__table-header-item">دوره</th>
                <th className="order__table-header-item">مبلغ</th>
                <th className="order__table-header-item">عملیات ها</th>
              </tr>
            </thead>
            <tbody className="order__table-body">
              {orders.map((order, index) => (
                <tr className="order__table-body-list">
                  <td className="order__table-body-item">
                    <a href="#" className="order__table-body-link">
                      {index + 1}
                    </a>
                  </td>
                  <td className="order__table-body-item">
                    {order?.createdAt?.slice(0, 10)}
                  </td>
                  <td className="order__table-body-item">تکمیل شده</td>
                  <td className="order__table-body-item">
                    {order?.course?.name}
                  </td>
                  <td className="order__table-body-item price-box">
                    {order.course.price == order.price ? (
                      order.price.toLocaleString()
                    ) : (
                      <>
                        <p className="price-old">
                          {order.course.price.toLocaleString()}
                        </p>
                        <p className="price-new">
                          {order.price.toLocaleString()}
                        </p>
                      </>
                    )}
                  </td>
                  <td className="order__table-body-item">
                    <a className="order__table-body-btn">نمایش</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserOrders;
