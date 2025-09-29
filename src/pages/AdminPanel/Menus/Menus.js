import React, { useEffect, useState } from 'react';

import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';
import swal from 'sweetalert';

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [newMenuData, setNewMenuData] = useState({
    title: '',
    href: '',
    parent: undefined,
  })

  useEffect(() => {
    fetchMenus()
  }, []);

  const fetchMenus = () => {
    fetch(`http://localhost:4000/v1/menus/all`)
      .then(res => res.json())
      .then(allMenus => {
        setMenus(allMenus);
        console.log(allMenus);
      })
  }

  const deleteMenu = (menuID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));

    swal({
      icon: 'warning',
      title: 'آیا از حذف اطمینان دارید',
      buttons: ['خیر', 'بله']
    }).then(result => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then(res => {
          if (res.ok) {
            swal({
              icon: 'success',
              title: 'حذف منو با موفقیت انجام شد',
            }).then(() => {
              fetchMenus();
            })
          } else {
            swal({
              icon: 'error',
              title: 'حذف منو با شکست مواجه شد',
            })
          }
        });
      }
    })
  }

  const addMenu = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/v1/menus`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newMenuData)
    })
      .then(res => {
        if (res.ok) {
          swal({
            icon: 'success',
            title: 'منو با موفقیت اضافه شد',
          }).then(() => {
            fetchMenus();
          })
        }
      })

  }

  return (
    <>

      <div class="container">
        <div class="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form class="form" onSubmit={(e) => { addMenu(e) }}>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <input
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                value={newMenuData.title}
                onChange={(e) => { setNewMenuData(prev => ({ ...prev, title: e.target.value })) }}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">لینک</label>
              <input
                id="href"
                type="text"
                isValid="false"
                placeholder="لطفا لینک را وارد کنید..."
                value={newMenuData.href}
                onChange={(e) => { setNewMenuData(prev => ({ ...prev, href: e.target.value })) }}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">والد</label>
              <select
                class="select"
                onChange={(e) => { setNewMenuData(prev => ({ ...prev, parent: e.target.value == '-1' ? undefined : e.target.value })) }}
              >
                <option value='-1'>منوی اصلی</option>
                {menus.map(menu => (
                  !menu.parent && (
                    <option value={menu._id}>{menu.title}</option>
                  )
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title='منو ها '>
        <table className='table'>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>برای منوی:</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : '_____'}</td>
                <td>
                  <button className='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                  <button className='btn btn-danger edit-btn' onClick={() => { deleteMenu(menu._id) }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
