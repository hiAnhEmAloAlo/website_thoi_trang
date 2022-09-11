import { Link, useNavigate } from 'react-router-dom';
import { LoginRegisterWrapper } from '../style';
import { useState } from 'react';
import { userApi } from '~/webService';
import validate from './validate';
import Alert from '~/components/infoModals/Alert';
import Breadcrumb from '~/components/contents/Breadcumb';
function Register() {
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: '',
    });
    const [inputValue, setInputValue] = useState({
        HoTen: '',
        SDT: '',
        DiaChi: '',
        Email: '',
        TenTaiKhoan: '',
        MatKhau: '',
        NhapLaiMatKhau: '',
    });
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const { result, message } = validate(inputValue);
        if (!result) {
            setAlert({
                type: 'error',
                show: true,
                message,
            });
            return;
        }

        const { NhapLaiMatKhau, ...data } = inputValue;
        const response = await userApi('register', data);
        const json = await response.json();
        if (json.status === 'Error') {
            setAlert({
                show: true,
                message: json.message,
                type: 'error',
            });
            return;
        }
        setAlert({
            type: 'success',
            show: true,
            message: 'Đăng ký thành công',
        });
        setTimeout(() => {
            navigate('/account/login', { replace: true });
        }, 1500);
    };
    return (
        <LoginRegisterWrapper>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div className="navLink">
                <Breadcrumb
                    links={[
                        { location: '/', text: 'Về trang chủ' },
                        { location: '#', text: 'Đăng ký' },
                    ]}
                />
            </div>
            <div className="wrapper__form">
                <div className="head__form">
                    <span> Đăng ký</span>
                </div>
                {/* <div className="error__message  hidden " id="err__regis"></div> */}
                <div className="form__content" id="form__regis">
                    <div className="content__form--group">
                        <input
                            autoFocus
                            type="text"
                            name="name"
                            className="content__form--input"
                            placeholder="Họ tên ..."
                            value={inputValue.HoTen}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, HoTen: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="text"
                            name="phone"
                            className="content__form--input"
                            value={inputValue.SDT}
                            placeholder="Số điện thoại ..."
                            onChange={(e) => setInputValue({ ...inputValue, SDT: e.target.value })}
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="text"
                            className="content__form--input"
                            value={inputValue.DiaChi}
                            placeholder="Địa chỉ ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, DiaChi: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="email"
                            name="phone"
                            className="content__form--input"
                            value={inputValue.Email}
                            placeholder="Email ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, Email: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group ">
                        <input
                            type="text"
                            name="username"
                            className="content__form--input"
                            value={inputValue.TenTaiKhoan}
                            placeholder="Tên đăng nhập ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, TenTaiKhoan: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="password"
                            name="password"
                            className="content__form--input"
                            value={inputValue.MatKhau}
                            placeholder="Mật khẩu ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, MatKhau: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="password"
                            name="repassword"
                            className="content__form--input"
                            value={inputValue.NhapLaiMatKhau}
                            placeholder="Nhập lại mật khẩu ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, NhapLaiMatKhau: e.target.value })
                            }
                        />
                    </div>
                    <div className="content__form--group " id="btn">
                        <button className="btn " id="btn-submit" onClick={handleSubmit}>
                            Đăng ký
                        </button>
                    </div>
                    <div className="content__form--group form__footer">
                        <p>
                            Đã có tài khoản{' '}
                            <span className="switch__modal switch__modal-login">
                                <span onClick={() => navigate('/account/login', { replace: true })}>
                                    Đăng nhập
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </LoginRegisterWrapper>
    );
}
export default Register;
