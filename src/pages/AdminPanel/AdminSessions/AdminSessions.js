import React, { useEffect, useState } from 'react'

import swal from 'sweetalert';
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';
function AdminSession() {

    const [courseID, setCourseID] = useState('-1')
    const [sessionData, setSessionData] = useState({
        title: '',
        time: '',
        video: null,
        free: 0
    })
    const [courses, setCourses] = useState([]);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchSessions()
    }, [])

    const fetchCourses = () => {
        fetch(`http://localhost:4000/v1/courses`)
            .then(res => res.json())
            .then(allCourses => {
                setCourses(allCourses);
            })
    }

    const fetchSessions = () => {
        fetch(`http://localhost:4000/v1/courses/sessions`)
            .then(res => res.json())
            .then(allSessions => {
                setSessions(allSessions);
            })
    }

    const addNewSession = (e) => {
        e.preventDefault();
        if (sessionData.time == '' || sessionData.title == '' || sessionData.video === null || courseID == '-1') {
            swal({
                icon: 'error',
                title: 'لطفا تمامی اطلاعات را وارد کنید',
            })
        } else {
            const localStorageData = JSON.parse(localStorage.getItem('user'));

            let formData = new FormData();
            formData.append('title', sessionData.title);
            formData.append('time', sessionData.time);
            formData.append('video', sessionData.video);
            formData.append('free', sessionData.free);

            fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`
                },
                body: formData
            })
                .then(res => {
                    if (res.ok) {
                        swal({
                            icon: 'success',
                            title: 'جلسه با موفقیت به دوره اضافه شد'
                        })
                            .then(() => {
                                fetchSessions();
                            })
                    }
                })
        }
    }

    const deleteSession = (sessionID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));

        swal({
            icon: 'warning',
            dangerMode: true,
            title: 'آیا از حذف این جلسه اطمینان دارید؟',
            buttons: ['خیر', 'بله']
        }).then(result => {
            if (result) {
                fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            icon: 'success',
                            title: 'جلسه با موفقیت حذف شد',
                        }).then(() => {
                            fetchSessions();
                        })
                    }
                })
            }
        })
    }

    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form className="form" onSubmit={addNewSession}>
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">عنوان جلسه</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="لطفا نام جلسه را وارد کنید..."
                                    value={sessionData.title}
                                    onChange={(e) => { setSessionData(prev => ({ ...prev, title: e.target.value })) }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">مدت زمان جلسه</label>
                                <input
                                    type="text"
                                    id="time"
                                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                                    value={sessionData.time}
                                    onChange={(e) => { setSessionData(prev => ({ ...prev, time: e.target.value })) }}
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select className="select" onChange={(e) => { setCourseID(e.target.value) }}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map(course => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title" style={{ display: "block" }}>
                                    ویدیو
                                </label>
                                <input type="file" accept="video/*" onChange={(e) => { setSessionData(prev => ({ ...prev, video: e.target.files[0] })) }} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="free">
                                <label class="input-title">وضعیت جلسه</label>
                                <div class="radios d-flex gap-3">
                                    <div class="presell-true">
                                        <label>
                                            <span>غیر رایگان</span>
                                            <input
                                                type="radio"
                                                value="0"
                                                name='free'
                                                checked={sessionData.free === 0}
                                                onChange={(e) => { setSessionData(prev => ({ ...prev, free: 0 })) }}
                                            />
                                        </label>
                                    </div>
                                    <div class="presell-false">
                                        <label>
                                            <span>رایگان</span>
                                            <input
                                                type="radio"
                                                name='free'
                                                value="1"
                                                checked={sessionData.free === 1}
                                                onChange={(e) => { setSessionData(prev => ({ ...prev, free: 1 })) }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input type="submit" value="افزودن" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title='جلسات'>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>وضعیت</th>
                            <th>تایم</th>
                            <th>دوره</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={session._id}>
                                <td>{index + 1}</td>
                                <td>{session.title}</td>
                                <td>{session.free == 0 ? 'پولی' : 'رایگان'}</td>
                                <td>{session.time}</td>
                                <td>{session.course?.name}</td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => { deleteSession(session._id) }}>
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

export default AdminSession;