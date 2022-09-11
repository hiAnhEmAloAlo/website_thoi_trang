import { Link, useNavigate } from 'react-router-dom';
import { LoginRegisterWrapper } from './style';
import { useState } from 'react';
import { getUsers, updateApi } from '~/webService';
import validate from './validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function EditCustomer({ selectedCustomer, setData, setEditing, setAlert }) {
    const [inputValue, setInputValue] = useState({
        HoTen: selectedCustomer.HoTen,
        SDT: selectedCustomer.SDT,
        DiaChi: selectedCustomer.DiaChi,
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

        const response = await updateApi('user', selectedCustomer.id, inputValue);
        const json = await response.json();
        if (json.status === 'Error') {
            setAlert({
                show: true,
                message: json.message,
                type: 'error',
            });
            return;
        } else {
            const res = await getUsers();
            setData(res);
            setAlert({
                type: 'success',
                show: true,
                message: 'Sửa thông tin thành công',
            });
            setEditing(false);
        }
    };
    return (
        <LoginRegisterWrapper>
            <div className="layer-modal"></div>
            <div className="wrapper__form">
                <div className="head__form">
                    <span> Sửa thông tin</span>
                    <span onClick={() => setEditing(false)}>
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
                            disabled
                            type="email"
                            className="content__form--input"
                            value={selectedCustomer.Email}
                            placeholder="Email ..."
                        />
                    </div>
                    <div className="content__form--group">
                        <input
                            disabled
                            type="email"
                            className="content__form--input"
                            value={selectedCustomer.TenTaiKhoan}
                            placeholder="Tên tài khoản ..."
                        />
                    </div>

                    <div className="content__form--group " id="btn">
                        <button className="btn " id="btn-submit" onClick={handleSubmit}>
                            Hoàn thành
                        </button>
                    </div>
                </div>
            </div>
        </LoginRegisterWrapper>
    );
}
export default EditCustomer;
