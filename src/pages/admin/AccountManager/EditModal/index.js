import React, { useState } from 'react';
import style from './style.module.scss';
import { updateApi } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { validator } from '~/ultis';
const EditModal = ({ setEditting, setAlert, setData, selectedAccount }) => {
    const [inputValue, setInputValue] = useState({
        Quyen: selectedAccount.Quyen,
        Email: selectedAccount.Email,
        TenTaiKhoan: selectedAccount.TenTaiKhoan,
        TrangThai: selectedAccount.TrangThai,
    });
    const validateInput = () => {
        if (!inputValue.Email || !inputValue.TenTaiKhoan)
            return { result: false, message: 'Không để trống thông tin' };
        if (!validator.email(inputValue.Email))
            return { result: false, message: 'Email không hợp lệ' };
        if (!validator.username(inputValue.TenTaiKhoan))
            return { result: false, message: 'Tên tài khoản không hợp lệ' };

        return { result: true };
    };
    const handleSubmit = async () => {
        const { result, message } = validateInput();
        if (!result) {
            setAlert({
                show: true,
                message,
                type: 'error',
            });
            return;
        }
        const res = await updateApi('account', selectedAccount.id, inputValue);
        const json = await res.json();
        if (json.status !== 'OK') {
            setAlert({ show: true, message: json.message, type: 'error' });
            return;
        }
        setAlert({
            show: true,
            message: 'Sửa thông tin thành công',
            type: 'sucess',
        });
        fetch('http://localhost:3100/api/account/')
            .then((res) => res.json())
            .then(setData);
        setEditting(false);
    };
    const role = [
        {
            id: 1,
            title: 'Nhân viên',
        },
        {
            id: 0,
            title: 'Khách hàng',
        },
    ];
    const status = [
        {
            id: 1,
            title: 'Hoạt động',
        },
        {
            id: 2,
            title: 'Khóa',
        },
    ];
    return (
        <div className={style.modalBody}>
            <div className={style.modalLayer}></div>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h3>Cập nhật thông tin người dùng</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={() => {
                            setEditting(false);
                        }}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên tài khoản</label>
                        <input
                            type="text"
                            value={inputValue.TenTaiKhoan}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, TenTaiKhoan: e.target.value })
                            }
                        ></input>
                    </div>

                    <div className={style.modalInput}>
                        <label>Email</label>
                        <input
                            type="text"
                            value={inputValue.Email}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, Email: e.target.value })
                            }
                            placeholder="Nhập size..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Vai trò</label>
                        {role.map((item) => {
                            return (
                                <span key={item.id}>
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        checked={item.id === inputValue.Quyen}
                                        onChange={(e) =>
                                            setInputValue({
                                                ...inputValue,
                                                Quyen: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    {item.title}
                                </span>
                            );
                        })}
                    </div>
                    <div className={style.modalInput}>
                        <label>Trạng thái</label>
                        {status.map((item) => {
                            return (
                                <span key={item.id}>
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        checked={item.id === inputValue.TrangThai}
                                        onChange={(e) =>
                                            setInputValue({
                                                ...inputValue,
                                                TrangThai: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    {item.title}
                                </span>
                            );
                        })}
                    </div>
                    <div className={style.modalBtn}>
                        <button onClick={handleSubmit}>Hoàn thành</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
