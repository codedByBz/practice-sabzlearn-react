import React, { useState } from "react";

import swal from "sweetalert";

function AdminCampaign() {
  const [discount, setDiscount] = useState(0);

  const setCampaign = (e) => {
    e.preventDefault();
    if (discount != 0 && discount != "") {
      fetch(`http://localhost:4000/v1/offs/all`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify({ discount }),
      }).then((res) => {
        if (res.ok) {
          swal({
            icon: "success",
            title: "کمپین با موفقیت راه اندازی شد",
            button: "خیلی هم عالی",
          });
        }
      });
    } else {
      swal({
        icon: "error",
        title: "لطفا مقدار معتبر وارد کنید",
        button: "باشه",
      });
    }
  };

  return (
    <>
      <div class="home-title">
        <span>برگزاری کمپین جدید</span>
      </div>
      <form class="form" onSubmit={setCampaign}>
        <div class="col-6">
          <div class="name input">
            <label class="input-title">درصد تخفیف</label>
            <input
              type="text"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              placeholder="لطفا درصد تخفیف همگانی را وارد کنید..."
            />
            <span class="error-message text-danger"></span>
          </div>
        </div>

        <div class="col-12">
          <div class="bottom-form">
            <div class="submit-btn">
              <input type="submit" value="ایجاد کمپین" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminCampaign;
