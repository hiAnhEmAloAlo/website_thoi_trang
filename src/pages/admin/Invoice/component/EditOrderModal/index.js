import style from './style.module.scss';
import { useState, useEffect } from 'react';
import { getInvoice, updateApi } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function EditOrderModal({ selectedOrder, setData, setEditing, setAlert }) {
    const [instocks, setInstocks] = useState([]);
    const [inputValue, setInputValue] = useState({
        HoTen: selectedOrder.HoTen,
        SDT: selectedOrder.SDT,
        TinhTrang: selectedOrder.TinhTrang,
        GhiChu: selectedOrder.GhiChu,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    useEffect(() => {
        // const instockRes = await fetch('http://localhost:3100/api/instock');
        // const instockResult = await instockRes.json();
        // setInstock(instockResult);
        fetch('http://localhost:3100/api/instock')
            .then((res) => res.json())
            .then(setInstocks)
            .catch(console.log);
    }, []);
    const orderStatus = [
        { id: 1, title: 'Chờ xác nhận' },
        { id: 2, title: 'Đã xác nhận' },
        { id: 3, title: 'Đang giao hàng' },
        { id: 4, title: 'Thành công' },
        { id: 5, title: 'Hủy' },
        { id: 6, title: 'Hoàn đơn' },
    ];

    const handleUpdate = async () => {
        if (
            selectedOrder.TinhTrang === 1 &&
            inputValue.TinhTrang !== 1 &&
            parseInt(inputValue.TinhTrang) < 5
        ) {
            //Cap nhat kho neu trang thai = 1 (Cho xac nhan)
            if (selectedOrder?.ChiTiet?.length === 0) {
                setAlert({ show: true, message: 'Đơn hàng chưa có sản phẩm', type: 'error' });
                return;
            }
            let result = true;
            selectedOrder?.ChiTiet?.forEach((orderDetail) => {
                const foundInstock = instocks.find(
                    (instock) => instock.id === orderDetail.MaChiTiet,
                );
                if (!foundInstock) {
                    setAlert({ show: true, message: 'Có lỗi xảy ra', type: 'error' });
                    result = false;
                    return;
                }
                if (foundInstock?.SoLuong < orderDetail.SoLuong) {
                    const productNameWithSize = `${foundInstock?.TenSP} size ${foundInstock.Size}`;
                    setAlert({
                        show: true,
                        message: `Trong kho không đủ ${productNameWithSize}`,
                        type: 'error',
                    });
                    result = false;
                    return;
                }
            });
            if (!result) return;
            //Trong kho du hang
            selectedOrder?.ChiTiet?.forEach(async (orderDetail) => {
                const foundInstock = instocks.find(
                    (instock) => instock.id === orderDetail.MaChiTiet,
                );
                const res = await fetch(`http://localhost:3100/api/instock/${foundInstock.id}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        SoLuong: foundInstock.SoLuong - orderDetail.SoLuong,
                    }),
                });
            });
        }
        console.log('update instock');
        let res = await updateApi('order', selectedOrder.id, inputValue);
        await res.json();
        setAlert({ show: true, message: 'Sửa thành công', type: 'success' });
        res = await getInvoice();
        setData(res);
        setEditing(false);
    };

    return (
        <div className={style.modalBody}>
            <div className={style.modalLayer}></div>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h3>Sửa thông tin đơn hàng</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={() => setEditing(false)}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên khách hàng</label>
                        <input type="text" value={selectedOrder.HoTen} disabled></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Số điện thoại</label>
                        <input type="text" value={selectedOrder.SDT} disabled></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Tình trạng </label>
                        <select
                            value={inputValue.TinhTrang}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, TinhTrang: e.target.value })
                            }
                        >
                            {orderStatus.map((status) => (
                                <option
                                    value={status.id}
                                    key={status.id}
                                    disabled={status.id < selectedOrder.TinhTrang}
                                >
                                    {status.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.modalInput}>
                        <label>Ghi chú </label>
                        <textarea
                            value={inputValue.GhiChu}
                            type="text"
                            placeholder="Ghi chú ..."
                            onChange={(e) =>
                                setInputValue({ ...inputValue, GhiChu: e.target.value })
                            }
                        />
                    </div>

                    <div className={style.modalBtn}>
                        <button onClick={handleUpdate}>Hoàn tất</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditOrderModal;
