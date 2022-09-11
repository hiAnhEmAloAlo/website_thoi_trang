import React, { useState, useContext } from 'react';
import { orderContext } from '../../../index';

import style from './style.module.scss';
const AddOrder = ({ customers, setAdding, setAddingDetail }) => {
    const [inputValue, setInputValue] = useState({
        GhiChu: '',
        id_nguoidung: '',
    });
    const { setData, setAlert } = useContext(orderContext);
    const orderStatus = [
        { id: 1, title: 'Chờ xác nhận' },
        { id: 2, title: 'Đã xác nhận' },
        { id: 3, title: 'Đang giao hàng' },
        { id: 4, title: 'Thành công' },
        { id: 5, title: 'Hủy' },
        { id: 6, title: 'Hoàn đơn' },
    ];
    const handleSubmit = async () => {
        // setAddingDetail(true);
        const validCustomer = customers.find(
            (customer) => customer.id.toString() === inputValue.id_nguoidung,
        );
        if (!inputValue.id_nguoidung) {
            setAlert({
                show: true,
                message: 'Không được để trống thông tin !',
                type: 'error',
            });
            return;
        }
        if (!validCustomer) {
            setAlert({
                show: true,
                message: 'Không tìm thấy khách hàng ',
                type: 'error',
            });
            return;
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(inputValue),
            headers: { 'Content-Type': 'application/json' },
        };
        let res = await fetch('http://localhost:3100/api/order/admin', options);
        let json = await res.json();

        setAdding(false);

        setAlert({
            show: true,
            message: 'Tạo đơn hàng thành công',
            type: 'success',
        });
        res = await fetch('http://localhost:3100/api/order');
        json = await res.json();
        setData(json);
    };
    return (
        <div className={style.wrapper}>
            <div className={style.header}>Thông tin đơn hàng</div>
            <div className={style.form}>
                <div className={style.inputGroup}>
                    <label>Mã khách hàng </label>
                    <input
                        type="text"
                        value={inputValue.id_nguoidung}
                        placeholder="Mã khách hàng ..."
                        onChange={(e) =>
                            setInputValue({ ...inputValue, id_nguoidung: e.target.value })
                        }
                    />
                </div>
                {/* <div className={style.inputGroup}>
                    <label>Tình trạng </label>
                    <select
                        onChange={(e) =>
                            setInputValue({ ...inputValue, TinhTrang: e.target.value })
                        }
                    >
                        <option value="">Tình trạng đơn hàng</option>
                        {orderStatus.map((status) => (
                            <option value={status.id} key={status.id}>
                                {status.title}
                            </option>
                        ))}
                    </select>
                </div> */}
                <div className={style.inputGroup}>
                    <label>Ghi chú </label>
                    <textarea
                        value={inputValue.GhiChu}
                        type="text"
                        placeholder="Ghi chú ..."
                        onChange={(e) => setInputValue({ ...inputValue, GhiChu: e.target.value })}
                    />
                </div>
                <div className={style.btnSubmit} id={style.change}>
                    <button onClick={handleSubmit}>Tạo đơn hàng</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
