import React, { useEffect, useState } from 'react';

import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

function AdminContacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContats();
    }, []);

    const fetchContats = () => {
        fetch('http://localhost:4000/v1/contact')
            .then(res => res.json())
            .then(allContacts => {
                console.log(allContacts);
                setContacts(allContacts);
            })
    }

    const showMessage = (message) => {
        swal({
            title: 'پیغام:',
            text: message,
            buttons: 'بستن'
        })
    }

    const answerContact = (email) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        swal({
            title: 'عه چه عجب! اومدی پاسخ بدی تنبل',
            content: 'input',
            buttons: 'ارسال کن سلطان 😈'
        })
            .then(value => {
                fetch(`http://localhost:4000/v1/contact/answer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorageData.token}`,
                    },
                    body: JSON.stringify({
                        email: email,
                        answer: value
                    })
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then(result => {
                        swal({
                            icon: 'success',
                            title: 'با موفقیت پاسختون ارسال شد',
                            buttons: 'فهمیدووم',
                        }).then(() => {
                            fetchContats();
                        })
                    })
            })
    }

    const deleteContact = (contactID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        swal({
            icon: 'warning',
            title: 'آیا از حذف پیغام اطمینان دارید؟',
            buttons: ['خیر', 'بلی'],
        }).then(result => {
            if (result) {

                fetch(`http://localhost:4000/v1/contact/${contactID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                })
                    .then(res => {
                        if (res.ok) {
                            toast.success("حذف با موفقیت انجام شد 😃", {
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
                            fetchContats()
                        }
                    })
            }
        })
    }


    return (
        <>
            <DataTable title='پیغام‌ها'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام‌</th>
                            <th>ایمیل</th>
                            <th>شماره تلفن</th>
                            <th>مشاهده</th>
                            <th>حذف</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact, index) => (
                                <tr key={contact._id}>
                                    <td className={contact.answer === 1 ? 'active' : 'not-active'}>{index + 1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <button className='btn btn-primary edit-btn' onClick={() => { showMessage(contact.body) }}>
                                            مشاهده‌ پیام
                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger edit-btn' onClick={() => { deleteContact(contact._id) }}>
                                            حذف
                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-success edit-btn' onClick={() => { answerContact(contact.email) }}>
                                            پاسخ
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

export default AdminContacts;