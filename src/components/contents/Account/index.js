import { faAddressCard, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useAuth from '~/hooks/useAuth';
import style from './style.module.scss';
import Alert from '~/components/infoModals/Alert';
const Account = () => {
    const auth = useAuth();
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: '',
    });
    const [changePass, setChangePass] = useState(false);
    const [inputValue, setInputValue] = useState({
        MatKhau: '',
        NhapLaiMatKhau: '',
    });

    console.log(inputValue);
    const handleChangePassWord = async () => {
        var Option = {
            method: 'PUT',
            body: JSON.stringify(inputValue),
            headers: { 'Content-Type': 'application/json', token: auth.token },
        };
        if (!inputValue.MatKhau || !inputValue.NhapLaiMatKhau) {
            setAlert({
                show: true,
                message: 'Không được để trống thông tin',
                type: 'error',
            });
            return;
        }
        if (inputValue.MatKhau !== inputValue.NhapLaiMatKhau) {
            setAlert({
                show: true,
                message: 'Mật khẩu không trùng khớp',
                type: 'error',
            });
            return;
        }

        const res = await fetch(`http://localhost:3100/api/account/personal`, Option);
        const json = await res.json();
        if (json.status === 'OK') {
            setAlert({
                show: true,
                message: 'Đổi mật khẩu thành công',
                type: 'sucess',
            });
            setChangePass(false);
            setInputValue({
                MatKhau: '',
                NhapLaiMatKhau: '',
            });
        }
    };

    return (
        <div className={style.wrapper}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div className={style.header}>
                <FontAwesomeIcon icon={faAddressCard} className={style.icon} />
                <h2>Thông tin tài khoản</h2>
            </div>
            <div className={style.form}>
                <div className={style.inputGroup}>
                    <label>Tên tài khoản</label>
                    <input
                        type="text"
                        value={auth.userInfo.TenTaiKhoan}
                        disabled
                        placeholder="Tên tài khoản ..."
                    />
                </div>
                <div className={style.inputGroup}>
                    <label>Email </label>
                    <input
                        type="text"
                        placeholder="Email ..."
                        disabled
                        value={auth.userInfo.Email}
                    />
                </div>

                <div className={style.btnSubmit} id={style.change}>
                    <button onClick={() => setChangePass(true)}>Đổi mật khẩu</button>
                </div>
            </div>
            {changePass && (
                <div className={style.wrapperModal}>
                    <div className={style.layer}></div>
                    <div className={style.container}>
                        <div className={style.modalHeader}>
                            <h1>Đổi mật khẩu</h1>
                            <FontAwesomeIcon
                                icon={faClose}
                                id={style.icon}
                                onClick={() => setChangePass(false)}
                            />
                        </div>
                        <div className={style.modalContent}>
                            <div className={style.inputGroup}>
                                <label>Mật khẩu mới: </label>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới ..."
                                    value={inputValue?.MatKhau}
                                    onChange={(e) =>
                                        setInputValue({ ...inputValue, MatKhau: e.target.value })
                                    }
                                />
                            </div>
                            <div className={style.inputGroup}>
                                <label>Nhập lại mật khẩu </label>
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu ..."
                                    value={inputValue?.NhapLaiMatKhau}
                                    onChange={(e) =>
                                        setInputValue({
                                            ...inputValue,
                                            NhapLaiMatKhau: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className={style.modalBtn} onClick={handleChangePassWord}>
                            <button>Hoàn tất</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
