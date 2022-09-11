import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginRegisterWrapper } from '../style';
import { userApi } from '~/webService';
import useAuth from '~/hooks/useAuth';
import Alert from '~/components/infoModals/Alert';
import Breadcrumb from '~/components/contents/Breadcumb';

const Login = () => {
    const focusRef = useRef();
    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: '',
    });
    const [inputValue, setInputValue] = useState({
        TenTaiKhoan: '',
        MatKhau: '',
    });
    const auth = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!inputValue.TenTaiKhoan || !inputValue.MatKhau) {
            setAlert({
                type: 'error',
                show: true,
                message: 'Tài khoản, mật khẩu không được trống',
            });

            return;
        }
        const response = await userApi('login', inputValue);
        const json = await response.json();
        console.log(json);
        if (json.status === 'OK') {
            auth.setState(true, json.token, json.info);
            navigate(-1);
        } else {
            setAlert({
                type: 'error',
                show: true,
                message: json.message,
            });
        }
    };
    return (
        <LoginRegisterWrapper
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
            }}
        >
            <div className="navLink">
                <Breadcrumb
                    links={[
                        { location: '/', text: 'Về trang chủ' },
                        { location: '#', text: 'Đăng nhập' },
                    ]}
                />
            </div>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div className="wrapper__form">
                <div className="head__form">
                    {/* <div className="img__logo"><img alt="1"></div> */}
                    <span> Đăng nhập</span>
                </div>
                {/* <div className="error__message hidden " id="err__login"></div> */}
                <div className="form__content" id="form__login">
                    <div className="content__form--group ">
                        <input
                            autoFocus
                            type="text"
                            name="usernameLogin"
                            className="content__form--input"
                            value={inputValue.TenTaiKhoan}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, TenTaiKhoan: e.target.value })
                            }
                            placeholder="Tên đăng nhập"
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            type="password"
                            name="passwordLogin"
                            className="content__form--input"
                            value={inputValue.MatKhau}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, MatKhau: e.target.value })
                            }
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <div className="content__form--group " id="btn">
                        <button className="btn" id="btn-submit" onClick={handleSubmit}>
                            Đăng nhập
                        </button>
                    </div>
                    <div className="content__form--group form__footer">
                        <p>
                            Chưa có tài khoản?{' '}
                            <span className="switch__modal switch__modal-regis">
                                <span
                                    onClick={() => navigate('/account/register', { replace: true })}
                                >
                                    Đăng ký
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </LoginRegisterWrapper>
    );
};

export default Login;
