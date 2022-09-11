import React, { useState, useContext, useRef } from 'react';
import { orderDetailContext } from '../../InvoiceDetailTable';

import style from './style.module.scss';
const AddOrder = ({ products, setAdding }) => {
    const SoLuongRef = useRef();
    const [inputValue, setInputValue] = useState({
        id_sanpham: '',
        MaChiTiet: '',
        SoLuong: 1,
    });
    const { setData, setAlert, selectedOrder } = useContext(orderDetailContext);
    const foundProduct = products?.find((product) => product.id === inputValue.id_sanpham);
    const handleSubmit = async () => {
        if (!inputValue.MaChiTiet || !inputValue.id_sanpham) {
            setAlert({
                show: true,
                message: 'Không được để trống thông tin !',
                type: 'error',
            });
            return;
        }
        const dataOrder = {
            id_donhang: selectedOrder.id_donhang,
            id_chitiet: inputValue.MaChiTiet,
            SoLuong: inputValue.SoLuong,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(dataOrder),
            headers: { 'Content-Type': 'application/json' },
        };
        let res = await fetch('http://localhost:3100/api/detail', options);
        let json = await res.json();
        if (json.status === 'OK') {
            setAlert({
                show: true,
                message: 'Tạo đơn hàng thành công',
                type: 'success',
            });
            res = await fetch('http://localhost:3100/api/order');
            json = await res.json();
            setData(json);
            setInputValue({
                id_sanpham: '',
                MaChiTiet: '',
                SoLuong: 1,
            });
            return;
        }
        setAlert({
            show: true,
            message: json.message,
            type: 'error',
        });
        console.log(json);
    };
    return (
        <div className={style.wrapper}>
            <div className={style.header}>Thông tin đơn hàng</div>
            <div className={style.form}>
                <div className={style.inputGroup}>
                    <label>Mã sản phẩm</label>
                    <input
                        id={style.idProduct}
                        type="text"
                        value={inputValue.id_nguoidung}
                        placeholder="Mã sản phẩm ..."
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                id_sanpham: parseInt(e.target.value),
                                MaChiTiet: '',
                                SoLuong: 1,
                            })
                        }
                    />
                    <p className={style.noFind}>
                        {!foundProduct && inputValue.id_sanpham !== ''
                            ? 'Không tìm thấy sản phẩm'
                            : ''}
                    </p>
                </div>
                <select
                    onChange={(e) => {
                        SoLuongRef.current = foundProduct?.ChiTiet?.find(
                            (instock) => instock.id === parseInt(e.target.value),
                        ).SoLuong;
                        console.log('ád', e.target.value);
                        setInputValue({ ...inputValue, MaChiTiet: e.target.value });
                    }}
                >
                    <option value="" disabled={inputValue.MaChiTiet}>
                        Chọn size
                    </option>
                    {foundProduct?.ChiTiet?.map((instock) => {
                        return (
                            <option
                                value={instock.id}
                                disabled={instock.SoLuong === 0}
                                key={instock.id}
                            >
                                {instock.Size} {instock.SoLuong === 0 && '- Hết hàng'}
                            </option>
                        );
                    })}
                </select>
                {foundProduct && inputValue.MaChiTiet && (
                    <span>Số lượng trong kho: {SoLuongRef.current}</span>
                )}

                <div className={style.inputGroup}>
                    <label>Số lượng sản phẩm</label>
                    <input
                        disabled={!inputValue.MaChiTiet}
                        type="number"
                        value={inputValue.SoLuong}
                        placeholder="Số lượng sản phẩm ..."
                        onChange={(e) => {
                            let quantity = parseInt(e.target.value);
                            if (quantity > SoLuongRef.current)
                                setInputValue({ ...inputValue, SoLuong: SoLuongRef.current });
                            else if (quantity <= 0) setInputValue({ ...inputValue, SoLuong: 1 });
                            else setInputValue({ ...inputValue, SoLuong: e.target.value });
                        }}
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

                <div className={style.btnSubmit} id={style.change}>
                    <button onClick={handleSubmit}>Thêm sản phẩm</button>
                </div>
                <div className={style.btnSubmit} id={style.change}>
                    <button onClick={() => setAdding(false)}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
