import React from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useMemo, useRef } from 'react';
import Alert from '~/components/infoModals/Alert';
import EditModal from './EditModal';
import SearchAccount from './SearchAccount';

const AccountManager = () => {
    const [warning, setWarning] = useState(false);
    const [editting, setEditting] = useState(false);
    const [data, setData] = useState([]);

    const account = useRef();
    const [filterValue, setFilterValue] = useState('');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: '',
    });
    useEffect(() => {
        fetch('http://localhost:3100/api/account/')
            .then((res) => res.json())
            .then(setData);
    }, []);

    const handleChangePassWord = async () => {
        const res = await fetch(`http://localhost:3100/api/account/pwd/${account.current.id}`, {
            method: 'PUT',
            body: JSON.stringify({ MatKhau: '123456' }),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        setWarning(false);
        setAlert({ show: true, message: 'Đặt lại mật khẩu thành công', type: 'success' });
    };
    const filterdData = useMemo(() => {
        return data.filter((item) => {
            const itemEmail = item.Email.toLowerCase();
            const findEmail = filterValue.toLowerCase();
            return (
                itemEmail.includes(findEmail) || item.MaNguoiDung.toString().includes(filterValue)
            );
        });
    }, [filterValue, data]);
    const handleEdit = () => {
        setEditting(true);
    };
    return (
        <div className={style.wrapper}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <SearchAccount data={data} setFilterValue={setFilterValue} filterValue={filterValue} />
            <div className={style.content}>
                <div className={style.wrapperTblPro}>
                    {editting && (
                        <EditModal
                            setEditting={setEditting}
                            setData={setData}
                            selectedAccount={{ ...account.current }}
                            setAlert={setAlert}
                        />
                    )}

                    <table border="1">
                        <thead>
                            <tr>
                                <th>Mã người dùng</th>
                                <th>Tên tài khoản </th>
                                <th>Email </th>
                                <th>Vai trò</th>
                                <th>Trạng thái tài khoản</th>
                                <th colSpan="2">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterdData?.map((item, index) => {
                                if (item.Quyen > 1) return null;
                                else
                                    return (
                                        <tr key={index}>
                                            <td>{item.MaNguoiDung}</td>
                                            <td>
                                                <div className={style.nameWrapper}>
                                                    <span>{item.TenTaiKhoan}</span>
                                                </div>
                                            </td>

                                            <td>{item.Email}</td>
                                            <td>{item.Quyen === 0 ? 'Khách Hàng' : 'Nhân Viên'}</td>
                                            <td>
                                                {item.TrangThai === 1 ? 'Hoạt động' : 'Đã khóa'}
                                            </td>
                                            <td>
                                                <button
                                                    className={style.edit}
                                                    onClick={() => {
                                                        account.current = {
                                                            id: item.MaNguoiDung,
                                                            Quyen: item.Quyen,
                                                            Email: item.Email,
                                                            TenTaiKhoan: item.TenTaiKhoan,
                                                            TrangThai: item.TrangThai,
                                                        };
                                                        handleEdit(item.id);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className={style.edit}
                                                    onClick={() => {
                                                        account.current = { id: item.MaNguoiDung };
                                                        setWarning(true);
                                                    }}
                                                >
                                                    Đặt lại mật khẩu
                                                </button>
                                            </td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
                {warning && (
                    <div className={style.comfirmWrapper}>
                        <div className={style.cofirmOverlay}></div>
                        <div className={style.confirmContainer}>
                            <div className={style.comfirmHeader}>
                                <h3>Cảnh báo</h3>
                                <FontAwesomeIcon
                                    icon={faClose}
                                    onClick={() => {
                                        setWarning(false);
                                    }}
                                />
                            </div>
                            <div className={style.comfirmContent}>
                                <p>Đặt lại mật khẩu mặc định (123456) ?</p>
                            </div>
                            <div className={style.comfirmBtn}>
                                <button
                                    onClick={() => {
                                        // setShow(false);
                                        setWarning(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button onClick={handleChangePassWord}>OK</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountManager;
