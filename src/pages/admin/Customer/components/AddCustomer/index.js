import { Link, useNavigate } from 'react-router-dom';
import { LoginRegisterWrapper } from './style';
import { useState } from 'react';
import { userApi, getUsers } from '~/webService';
import validate from './validate';
import Alert from '~/components/infoModals/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function AddCustomer({ setAdding, setData, setAlert }) {
    const [inputValue, setInputValue] = useState({
        HoTen: '',
        SDT: '',
        DiaChi: '',
        Email: '',
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
        const response = await userApi('register/default', inputValue);
        const json = await response.json();
        console.log(json);
        if (json.status === 'Error') {
            setAlert({
                show: true,
                message: json.message,
                type: 'error',
            });
            return;
        } else {
            const respose = await getUsers();

            setData(respose);
            setAlert({
                type: 'success',
                show: true,
                message: 'Đăng ký thành công',
            });
            setAdding(false);
        }
    };
    return (
        <LoginRegisterWrapper>
            <div className="layer-modal"></div>
            <div className="wrapper__form">
                <div className="head__form">
                    <span> Đăng ký</span>
                    <span onClick={() => setAdding(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                {/* <div className="error__message  hidden " id="err__regis"></div> */}
                <div className="form__content" id="form__regis">
                    <div className="content__form--group">
                        <input
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

                    <div className="content__form--group " id="btn">
                        <button className="btn " id="btn-submit" onClick={handleSubmit}>
                            Hoàn thành
                        </button>
                    </div>
                    {/* <div className="content__form--group form__footer">
                        <p>
                            Đã có tài khoản{' '}
                            <span className="switch__modal switch__modal-login">
                                <Link to="/account/login">Đăng nhập</Link>
                            </span>
                        </p>
                    </div> */}
                </div>
            </div>
        </LoginRegisterWrapper>
    );
}
export default AddCustomer;
