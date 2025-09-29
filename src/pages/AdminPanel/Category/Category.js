import React, { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import './Category.css';

import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { toast } from 'react-toastify';
import swal from 'sweetalert';


function Category() {
    const [categories, setCategories] = useState([]);

    const [newCategoryData, setNewCategoryData] = useState({
        categoryName: '',
        shortName: '',
    });

    function showToast(type, title) {
        if (type == 'success') {
            toast.success(title, {
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
        } else {
            toast.error(title, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                rtl: true,
                theme: "colored",
                style: { backgroundColor: "#D32F2F", color: "#fff", fontFamily: 'IRANSans' },
            });
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = () => {
        fetch(`http://localhost:4000/v1/category`)
            .then(res => res.json())
            .then(allCategories => {
                setCategories(allCategories);
            })
    }

    const resetAddCategoryInputs = () => {
        setNewCategoryData({
            categoryName: '',
            shortName: ''
        })
    }

    const createNewCategory = (e) => {
        e.preventDefault();
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        const newCategoryInfo = {
            title: newCategoryData.categoryName,
            name: newCategoryData.shortName
        }
        if (newCategoryData.categoryName.length, newCategoryData.shortName.length) {
            fetch(`http://localhost:4000/v1/category`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify(newCategoryInfo)
            })
                .then(res => res.json())
                .then(result => {
                    fetchCategories();
                    resetAddCategoryInputs();
                    showToast('success', "دسته بندی با موفقیت اضافه شد 😃");
                })
                .catch(err => {
                    console.log(err);
                    showToast('error', "خطای شبکه‌ای رخ داد");
                })
        } else {
            showToast('error', '"لطفا هر دو فیلد را پر کنید!"');
        }
    }


    const DeleteCategory = (ID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:4000/v1/category/${ID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                const filteredCategories = categories.filter(category => category._id !== result._id)
                setCategories(filteredCategories);
                showToast('success', 'دسته بندی با موفقیت حذف شد');
            })
    }

    const updateCategory = (categoryID) => {
        swal({
            title: 'عنوان جدید را وارد کنید',
            content: 'input'
        }).then(newTitle => {
            if (newTitle.trim().length) {
                const localStorageData = JSON.parse(localStorage.getItem('user'));
                fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorageData.token}`
                    },
                    body: JSON.stringify({
                        title: newTitle
                    })
                })
                    .then(res => res.json())
                    .then(result => {
                        fetchCategories();
                        showToast('success', 'دسته بندی با موفقیت ویرایش شد');
                    })
            }
        })
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن دسته‌بندی جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">عنوان</label>
                                <input
                                    type="input"
                                    id="title"
                                    placeholder="لطفا عنوان را وارد کنید..."
                                    value={newCategoryData.categoryName}
                                    onChange={(e) => {
                                        setNewCategoryData((prev) => {
                                            return { ...prev, categoryName: e.target.value }
                                        })
                                    }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">اسم کوتاه</label>
                                <input
                                    element="input"
                                    id="shortname"
                                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                                    value={newCategoryData.shortName}
                                    onChange={(e) => {
                                        setNewCategoryData((prev) => {
                                            return { ...prev, shortName: e.target.value }
                                        })
                                    }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input
                                        type="submit"
                                        value="افزودن"
                                        onClick={(e) => { createNewCategory(e) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title="دسته بندی ها">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-btn"
                                            onClick={() => {
                                                updateCategory(category._id)
                                            }}
                                        >
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger delete-btn"
                                            onClick={() => {
                                                DeleteCategory(category._id)
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

export default Category;