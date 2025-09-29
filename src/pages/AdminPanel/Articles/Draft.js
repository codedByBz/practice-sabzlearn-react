import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Editor from '../../../Components/Editor/Editor';
import swal from 'sweetalert';
function Draft() {

    const [categories, setCategories] = useState([])
    const [newArticleData, setNewArticleData] = useState({
        title: '',
        description: '',
        body: null,
        shortName: '',
        categoryID: '-1',
        cover: null
    });
    const [articleCover, setArticleCover] = useState(null)

    const { shortName } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/v1/articles/${shortName}`)
            .then(res => res.json())
            .then(articleData => {
                console.log(articleData);
                setNewArticleData(articleData);
            })
        fetchCategories()
    }, [shortName])

    const fetchCategories = () => {
        fetch(`http://localhost:4000/v1/category`)
            .then(res => res.json())
            .then(allCategories => {
                setCategories(allCategories);
            })
    }


    const addNewArticle = (e) => {
        e.preventDefault();

        if (newArticleData.body === null || newArticleData.categoryID == '-1' || typeof newArticleData.cover === 'String' || newArticleData.description == '' || newArticleData.shortName == '' || newArticleData.title == '') {
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
            formData.append('categoryID', newArticleData.categoryID._id);
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
                    })
                }
            })
        }
    }


    const draftArticle = () => {

        if (newArticleData.body === null || newArticleData.categoryID == '-1' || typeof newArticleData.cover === 'String' || newArticleData.description == '' || newArticleData.shortName == '' || newArticleData.title == '') {
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
            formData.append('categoryID', newArticleData.categoryID._id);
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
                    })
                }
            })
        }
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن مقاله جدید</span>
                    </div>
                    <form className="form" onSubmit={(e) => { addNewArticle(e) }}>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    عنوان
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={newArticleData.title}
                                    onChange={(e) => {
                                        setNewArticleData(prev => ({ ...prev, title: e.target.value }))
                                    }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    لینک
                                </label>
                                <input
                                    type="text"
                                    id="shortName"
                                    value={newArticleData.shortName}
                                    onChange={(e) => {
                                        setNewArticleData(prev => ({ ...prev, shortName: e.target.value }))
                                    }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    چکیده
                                </label>
                                <textarea
                                    style={{ width: "100%" }}
                                    value={newArticleData.description}
                                    onChange={(e) => {
                                        setNewArticleData(prev => ({ ...prev, description: e.target.value }))
                                    }}
                                ></textarea>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    محتوا
                                </label>
                                <Editor
                                    value={newArticleData.body}
                                    setValue={data => { setNewArticleData(prev => ({ ...prev, body: data })) }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    کاور
                                </label>
                                {newArticleData.cover && typeof newArticleData.cover === 'string' && (
                                    <span>این عکس، کاور قبلی است و ذخیره نیست و شما باید یک کاور جدید آپلود کنید</span>
                                )}
                                <div className="col-12 d-flex">
                                    {newArticleData.cover && typeof newArticleData.cover === 'string' && (
                                        <img
                                            className='col-2 m-1'
                                            style={{ borderRadius: '5px' }}
                                            src={'http://localhost:4000/courses/covers/' + newArticleData.cover}
                                        />
                                    )}
                                    < input
                                        className='col-10 m-1'
                                        style={{ width: '70%', display: 'inline-block' }}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => { setNewArticleData(prev => ({ ...prev, cover: e.target.files[0] })) }}
                                    />
                                </div>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title" style={{ display: "block" }}>
                                    دسته بندی
                                </label>
                                <select
                                    value={newArticleData.categoryID._id}
                                    onChange={(e) => { setNewArticleData(prev => ({ ...prev, categoryID: e.target.value })) }}
                                >
                                    <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                                    {
                                        categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.title}</option>
                                        ))
                                    }
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <input type="submit" value="افزودن" />
                            </div>
                        </div>
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <input type="button" value="پیش نویس" onClick={() => { draftArticle() }} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Draft;