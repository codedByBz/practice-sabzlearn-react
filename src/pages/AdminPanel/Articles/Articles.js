import React, { useEffect, useState } from 'react'

import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';
import swal from 'sweetalert';
import Editor from '../../../Components/Editor/Editor';
import { Link } from 'react-router-dom';
export default function Articles() {

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([])
  const [newArticleData, setNewArticleData] = useState({
    title: '',
    description: '',
    body: null,
    shortName: '',
    categoryID: '-1',
    cover: null
  });

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [])

  const fetchCategories = () => {
    fetch(`http://localhost:4000/v1/category`)
      .then(res => res.json())
      .then(allCategories => {
        setCategories(allCategories);
      })
  }

  const fetchArticles = () => {
    fetch(`http://localhost:4000/v1/articles`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setArticles(data);
      })
  }

  const deleteArticle = (articleID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    swal({
      icon: 'warning',
      title: 'آیا از حذف این مقاله اطمینان دارید؟',
      buttons: ['خیر', 'بله'],
    }).then(result => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        })
          .then(res => {
            if (res.ok) {
              swal({
                icon: 'success',
                title: 'حذف مقاله با موفقیت انجام شد',
                buttons: 'فهمیدووم'
              }).then(() => {
                fetchArticles();
              })
            }
          })
      }
    })
  }

  const showDescription = (description) => {
    swal({
      title: 'توضیح مقاله:',
      text: description,
    })
  }

  const showBody = (body) => {
    swal({
      title: 'متن مقاله',
      text: 'متن متن متن متن متن متن متن'
    })
  }

  const addNewArticle = (e) => {
    e.preventDefault();

    if (newArticleData.body === null || newArticleData.categoryID == '-1' || newArticleData.cover === null || newArticleData.description == '' || newArticleData.shortName == '' || newArticleData.title == '') {
      swal({
        icon: 'error',
        title: 'لطفا تمام مقادیر را وارد کنید',
      })
    } else {

      let formData = new FormData();
      formData.append('title', newArticleData.title);
      formData.append('description', newArticleData.description);
      formData.append('body', newArticleData.body);
      formData.append('shortName', newArticleData.shortName);
      formData.append('categoryID', newArticleData.categoryID);
      formData.append('cover', newArticleData.cover);

      const localStorageData = JSON.parse(localStorage.getItem('user'));
      fetch(`http://localhost:4000/v1/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      }).then(res => {
        if (res.ok) {
          swal({
            icon: 'success',
            title: 'مقاله با موفقیت اضافه شد'
          }).then(() => {
            fetchArticles();
          })
        }
      })
    }
  }

  const draftArticle = () => {

    if (newArticleData.body === null || newArticleData.categoryID == '-1' || newArticleData.cover === null || newArticleData.description == '' || newArticleData.shortName == '' || newArticleData.title == '') {
      swal({
        icon: 'error',
        title: 'لطفا تمام مقادیر را وارد کنید',
      })
    } else {
      let formData = new FormData();
      formData.append('title', newArticleData.title);
      formData.append('description', newArticleData.description);
      formData.append('body', newArticleData.body);
      formData.append('shortName', newArticleData.shortName);
      formData.append('categoryID', newArticleData.categoryID);
      formData.append('cover', newArticleData.cover);

      const localStorageData = JSON.parse(localStorage.getItem('user'));
      fetch(`http://localhost:4000/v1/articles/draft`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      }).then(res => {
        if (res.ok) {
          swal({
            icon: 'success',
            title: 'مقاله با موفقیت پیش نویس شد'
          }).then(() => {
            fetchArticles();
          })
        }
      })
    }
  }



  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form" onSubmit={addNewArticle}>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setNewArticleData(prev => ({ ...prev, title: e.target.value }))
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input
                  type="text"
                  id="shortName"
                  onChange={(e) => {
                    setNewArticleData(prev => ({ ...prev, shortName: e.target.value }))
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                <textarea
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setNewArticleData(prev => ({ ...prev, description: e.target.value }))
                  }}
                ></textarea>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor
                  value={newArticleData.body}
                  setValue={data => { setNewArticleData(prev => ({ ...prev, body: data })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { setNewArticleData(prev => ({ ...prev, cover: e.target.files[0] })) }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select onChange={(e) => { setNewArticleData(prev => ({ ...prev, categoryID: e.target.value })) }}>
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {
                    categories.map(category => (
                      <option value={category._id}>{category.title}</option>
                    ))
                  }
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" />
              </div>
            </div>
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="button" value="پیش نویس" onClick={() => { draftArticle() }} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title='مقاله‌ها'>
        <table className='table'>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>ادامه</th>
              <th>مشاهده توضیح</th>
              <th>مشاهده متن مقاله</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.publish === 1 ? 'منتشر شده' : 'پیش‌نویس'}</td>
                <td>
                  {article.publish === 1 ? (
                    <i className='fa fa-check'></i>
                  ) : (
                    <Link to={`draft/${article.shortName}`} className='btn btn-primary edit-btn'>
                      ادامه
                    </Link>
                  )}
                </td>
                <td>
                  <button className='btn btn-primary edit-btn' onClick={() => { showDescription(article.description) }}>
                    مشاهده
                  </button>
                </td>
                <td>
                  <button className='btn btn-primary edit-btn' onClick={() => { showBody(article.body) }}>
                    مشاهده
                  </button>
                </td>
                <td>
                  <button className='btn btn-primary edit-btn'>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger edit-btn' onClick={() => { deleteArticle(article._id) }}>
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
