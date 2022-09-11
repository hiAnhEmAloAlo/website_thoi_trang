import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatMoney, orderStatusToText } from '~/ultis';
import { getInvoice, updateApi } from '~/webService';

const EditInvoiceDetail = ({ setAlert, setData, selectedOrder, selectedDetail, setEditing }) => {
    const [dataInstock, setDataInstock] = useState([]);
    const [showInstock, setShowInstock] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({
        SoLuong: selectedDetail.SoLuong,
    });
    useEffect(() => {
        fetch('http://localhost:3100/api/instock')
            .then((respon) => respon.json())
            .then(setDataInstock);
    }, []);
    const handleUpdate = async () => {
        if (!dataUpdate.SoLuong) {
            setAlert({ show: true, message: 'Không được để trống số lượng', type: 'error' });
            return;
        }
        let res = await updateApi('detail', selectedDetail.id, dataUpdate);
        let json = await res.json();
        if (json.status === 'OK') {
            res = await getInvoice();
            setAlert({ show: true, message: 'Sửa thông tin thành công', type: 'success' });
            setData(res);
            setEditing(false);
        }
    };
    const foundInstock = dataInstock?.find((item) => item.id === selectedDetail.MaChiTiet)?.SoLuong;
    console.log(selectedDetail, selectedOrder);
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
                        <label>Tên khách hàng:</label>
                        {selectedOrder.HoTen}
                    </div>

                    <div className={style.modalInput}>
                        <label>Số điện thoại:</label>
                        {selectedOrder.SDT}
                    </div>
                    <div className={style.modalInput}>
                        <label>Ngày tạo:</label>
                        {formatDate(selectedOrder.NgayTao)}
                    </div>
                    <div className={style.modalInput}>
                        <label>Tình trạng </label>
                        {orderStatusToText(selectedOrder.TinhTrang)}
                    </div>
                    <div>
                        <div className={style.wapperInfoProduct}>
                            <div className={style.img}>
                                <img
                                    src={`http://localhost:3100/images/${selectedDetail.TenAnh}`}
                                />
                            </div>
                            <div className={style.infoInvoice}>
                                <span className={style.name}>
                                    {selectedDetail.TenSP} - {selectedDetail.Size}
                                </span>
                                <div className={style.price}>
                                    <span>Đơn giá: {formatMoney(selectedDetail.DonGia, 'đ')}</span>
                                    <span>Khuyến mãi: {selectedDetail.KhuyenMai}%</span>
                                    <span className={style.instock}>
                                        Số lượng:
                                        <input
                                            type="number"
                                            value={dataUpdate.SoLuong}
                                            onChange={(e) => {
                                                setShowInstock(true);
                                                let quantity = parseInt(e.target.value);
                                                if (quantity > foundInstock)
                                                    setDataUpdate({
                                                        SoLuong: foundInstock,
                                                    });
                                                else if (quantity <= 0)
                                                    setDataUpdate({
                                                        SoLuong: 1,
                                                    });
                                                else
                                                    setDataUpdate({
                                                        SoLuong: parseInt(e.target.value),
                                                    });
                                            }}
                                        />
                                        {showInstock && (
                                            <span>Trong kho có: {foundInstock} sản phẩm</span>
                                        )}
                                    </span>
                                    <span>
                                        Thành tiền:{' '}
                                        {formatMoney(
                                            selectedDetail.DonGia *
                                                (1 - selectedDetail.KhuyenMai / 100) *
                                                dataUpdate.SoLuong,
                                            'đ',
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.modalBtn}>
                        <button onClick={handleUpdate}>Hoàn tất</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInvoiceDetail;
