import React, { useEffect, useState } from 'react';

import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from 'sweetalert';


function AdminOffs() {
    const [offs, setOffs] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newOffData, setNewOffData] = useState({
        code: '',
        percent: '',
        course: '-1',
        max: 1,
    });

    useEffect(() => {
        fetchCourses();
        fetchOffs();
    }, [])

    const fetchCourses = () => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(res => res.json())
            .then(allCourses => {
                setCourses(allCourses);
            })
    }

    const addNewOff = (e) => {
        e.preventDefault();
        if (newOffData.code !== '' && newOffData.percent !== '' && newOffData.course != '-1' && newOffData.max > 0 && newOffData.max !== '') {
            const offData = {
                code: newOffData.code,
                percent: newOffData.percent,
                course: newOffData.course,
                max: newOffData.max
            }
            fetch(`http://localhost:4000/v1/offs`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: JSON.stringify(offData)
            })
                .then(res => {
                    if (res.ok) {
                        swal({
                            icon: 'success',
                            title: 'کد تخفیف با موفقیت ایجاد شد',
                            button: 'فهمیدم'
                        }).then(() => {
                            fetchOffs();
                        })
                    } else {
                        swal({
                            icon: 'error',
                            title: 'مشکلی در ایجاد کد تخفیف پیش آمده',
                            button: 'آها'
                        })
                    }
                })
                .catch(err => {
                    swal({
                        icon: 'error',
                        title: 'خطای سروری در ایجاد کد تخفیف پیش آمده',
                        button: 'اوکی'
                    })
                })
        } else {
            swal({
                icon: 'error',
                title: 'مقادیر وارد شده نامعتبره!',
                button: 'باشه'
            })
        }
    }

    const fetchOffs = () => {
        fetch(`http://localhost:4000/v1/offs`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(allOffs => {
                console.log(allOffs);
                setOffs(allOffs)
            })
    }

    const deleteOff = (offID) => {
        swal({
            icon: 'warning',
            title: 'آیا از حذف اطمینان دارید؟',
            buttons: ['نه، دستم خورد', 'آره']
        }).then(result => {
            if (result) {
                fetch(`http://localhost:4000/v1/offs/${offID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                })
                    .then(res => {
                        if (res.ok) {
                            swal({
                                icon: 'success',
                                title: 'کد تخفیف با موفقیت حذف شد',
                                button: 'فهمیدم'
                            }).then(() => {
                                fetchOffs();
                            })
                        }
                    })
            }
        })
    }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن کد تخفیف جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">کد تخفیف</label>
                                <input
                                    type="text"
                                    id="code"
                                    placeholder="لطفا کد تخفیف را وارد نمایید"
                                    value={newOffData.code}
                                    onChange={(e) => { setNewOffData(prev => ({ ...prev, code: e.target.value })) }}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">درصد تخفیف</label>
                                <input
                                    type="text"
                                    id="percent"
                                    placeholder="لطفا درصد تخفیف را وارد نمایید"
                                    value={newOffData.percent}
                                    onChange={(e) => { setNewOffData(prev => ({ ...prev, percent: e.target.value })) }}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">حداکثر استفاده</label>
                                <input
                                    type="number"
                                    id="max"
                                    placeholder="حداکثر استفاده از کد تخفیف"
                                    value={newOffData.max}
                                    onChange={(e) => { setNewOffData(prev => ({ ...prev, max: e.target.value })) }}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select
                                    class="select"
                                    onChange={(e) => { setNewOffData(prev => ({ ...prev, course: e.target.value })) }}
                                >
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map(course => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={(e) => { addNewOff(e) }} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title='کد‌های تخفیف‌'>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کد</th>
                            <th>درصد</th>
                            <th>حداکثر استفاده</th>
                            <th>دفعات استفاده</th>
                            <th>سازنده</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offs.map((off, index) => (
                            <tr key={off._id}>
                                <td>{index + 1}</td>
                                <td>{off.code}</td>
                                <td>{off.percent}</td>
                                <td>{off.max}</td>
                                <td>{off.uses}</td>
                                <td>{off.creator}</td>

                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-danger delete-btn"
                                        onClick={() => deleteOff(off._id)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}

export default AdminOffs;