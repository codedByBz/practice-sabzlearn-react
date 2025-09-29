import React, { useEffect, useState } from 'react';
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';
import "./Courses.css";
import swal from 'sweetalert';
import { toast } from 'react-toastify';

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    shortName: '',
    categoryID: '-1',
    price: null,
    support: '',
    status: 'presell',
    cover: null
  });

  useEffect(() => {
    fetchCourses();
    fetch(`http://localhost:4000/v1/category`)
      .then(res => res.json())
      .then(allCategories => {
        setCategories(allCategories);
      })
  }, []);

  const fetchCourses = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/v1/courses', {
      headers: {
        "Authorization": `Bearer ${localStorageData.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(coursesData => {
        setCourses(coursesData);
      });
  };

  const deleteCourse = (courseID) => {
    swal({
      title: 'آیا از حذف این دوره اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
      dangerMode: false,
    }).then(result => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        })
          .then(res => res.json())
          .then(result => {
            toast.success("دوره با موفقیت حذف شد 😃", {
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
            fetchCourses();
          });
      }
    });
  };

  const addNewCourse = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem('user'));

    const { name, description, shortName, categoryID, price, support, status, cover } = courseData;
    if (!name || !description || !shortName || categoryID == '-1' || price == null || !support || !status || !cover) {
      swal({
        icon: 'error',
        title: "لطفاً تمام فیلدها را کامل پر کنید 😐",
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', courseData.name);
    formData.append('description', courseData.description);
    formData.append('shortName', courseData.shortName);
    formData.append('categoryID', courseData.categoryID);
    formData.append('price', courseData.price);
    formData.append('support', courseData.support);
    formData.append('status', courseData.status);
    formData.append('cover', courseData.cover);

    fetch('http://localhost:4000/v1/courses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        toast.success("دوره با موفقیت اضافه شد 😃", {
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
        fetchCourses();
      });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form" onSubmit={addNewCourse}>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام دوره را وارد کنید..."
                  value={courseData.name}
                  onChange={(e) => { setCourseData(prev => ({ ...prev, name: e.target.value })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیح دوره</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                  value={courseData.description}
                  onChange={(e) => { setCourseData(prev => ({ ...prev, description: e.target.value })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">url دوره</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا تعداد دوره را وارد کنید..."
                  value={courseData.shortName}
                  onChange={(e) => { setCourseData(prev => ({ ...prev, shortName: e.target.value })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره (تومان) </label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                  value={courseData.price}
                  onChange={(e) => { setCourseData(prev => ({ ...prev, price: e.target.value })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نوع پشتیبانی دوره</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                  value={courseData.support}
                  onChange={(e) => { setCourseData(prev => ({ ...prev, support: e.target.value })) }}

                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={(e) => { setCourseData(prev => ({ ...prev, categoryID: e.target.value })) }}>
                  <option value="-1">لطفاً دسته‌بندی را انتخاب کنید</option>
                  {
                    categories.map(category => (
                      <option value={category._id}>{category.title}</option>
                    ))
                  }
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input type="file" id="file" onChange={(e) => { setCourseData(prev => ({ ...prev, cover: e.target.files[0] })) }} />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="col-6">
                  <div class="presell">
                    <label class="input-title">وضعیت دوره</label>
                    <div class="radios">
                      <div class="presell-true">
                        <label>
                          <span>پیش فروش</span>
                          <input
                            type="radio"
                            value="presell"
                            name="presell"
                            checked={courseData.status === 'presell'}
                            onChange={(e => {
                              if (e.target.checked) {
                                setCourseData(prev => ({ ...prev, status: 'presell' }))
                              }
                            })}
                          />
                        </label>
                      </div>
                      <div class="presell-false">
                        <label>
                          <span>در حال برگزاری</span>
                          <input
                            type="radio"
                            value="onperforming"
                            name="presell"
                            checked={courseData.status === 'start'}
                            onChange={(e => {
                              if (e.target.checked) {
                                setCourseData(prev => ({ ...prev, status: 'start' }))
                              }
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
      <DataTable title='دوره ها'>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                  <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'تکمیل'}</td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>
                  <td>{course.categoryID}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => {
                        deleteCourse(course._id)
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
