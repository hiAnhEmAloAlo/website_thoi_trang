import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect, createContext } from 'react';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';

import { deleteApi, getData } from '~/webService';
import AlertWarning from '~/components/infoModals/AlertWarning';
import { formatMoney, orderStatusToText } from '~/ultis';
import AddDetailModal from './AddDetailModal';
import EditInvoiceDetail from './EditInvoiceDetail';
export const orderDetailContext = createContext();
function InvoiceDetailTable({ data, setData, setAlert }) {
    const [addingDetail, setAddingDetail] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deletingDetail, setDeletingDetail] = useState(false);
    const selectedDetailRef = useRef();
    const selectedOrderRef = useRef();

    const handleDelete = async () => {
        let res = await deleteApi('detail', selectedOrderRef.current);
        let reponse = await res.json();
        if (reponse.status !== 'OK') {
            return;
        } else {
            res = await fetch('http://localhost:3100/api/order');
            reponse = await res.json();
            setData(reponse);
            setAlert({
                show: true,
                type: 'success',
                message: 'Xóa thành công',
            });
        }
    };
    return (
        <orderDetailContext.Provider
            value={{ setData, setAlert, selectedOrder: selectedOrderRef.current }}
        >
            <div className={style.wrapperTblPro}>
                {deletingDetail && (
                    <AlertWarning handleDelete={handleDelete} setDeleting={setDeletingDetail} />
                )}
                {addingDetail && <AddDetailModal setAddingDetail={setAddingDetail} />}

                {editing === true ? (
                    <EditInvoiceDetail
                        setAlert={setAlert}
                        setData={setData}
                        selectedDetail={{ ...selectedDetailRef.current }}
                        selectedOrder={{ ...selectedOrderRef.current }}
                        setEditing={setEditing}
                    />
                ) : null}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Tên sản phẩm</th>
                            <th>Size</th>
                            <th>Đơn giá</th>
                            <th>Khuyến Mãi</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th colSpan="2">Thao Tác</th>
                        </tr>
                    </thead>
                    {data.map((item) => {
                        return (
                            <tbody key={item.id}>
                                <tr>
                                    <td rowSpan={item.ChiTiet.length + 3}>{item.id}</td>
                                </tr>
                                {item.ChiTiet.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td>
                                                <div className={style.nameWrapper}>
                                                    <span className={style.name}>
                                                        {element.TenSP}
                                                    </span>
                                                    <span className={style.fullName}>
                                                        {element.TenSP}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{element.Size}</td>
                                            <td>{formatMoney(element.DonGia, 'đ')}</td>
                                            <td>{element.KhuyenMai}%</td>
                                            <td>{element.SoLuong}</td>
                                            <td>{formatMoney(element.ThanhTien, 'đ')}</td>
                                            <td>
                                                <button
                                                    className={style.edit}
                                                    onClick={() => {
                                                        if (item.TinhTrang > 2) {
                                                            setAlert({
                                                                show: true,
                                                                type: 'warning',
                                                                message: `Tình trạng đơn hàng: ${orderStatusToText(
                                                                    item.TinhTrang,
                                                                )}`,
                                                            });
                                                            return;
                                                        }
                                                        setEditing(true);
                                                        selectedDetailRef.current = element;
                                                        selectedOrderRef.current = item;
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className={style.delete}
                                                    onClick={() => {
                                                        if (item.TinhTrang > 2) {
                                                            setAlert({
                                                                show: true,
                                                                type: 'warning',
                                                                message: `Tình trạng đơn hàng: ${orderStatusToText(
                                                                    item.TinhTrang,
                                                                )}`,
                                                            });
                                                            return;
                                                        }
                                                        setDeletingDetail(true);
                                                        selectedOrderRef.current = element.id;
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} /> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {item.ChiTiet.length > 0 ? (
                                    <tr>
                                        <td colSpan={1} className={style.totalPrice}>
                                            Tổng tiền
                                        </td>
                                        <td colSpan={7}>{formatMoney(item.TongTien, 'đ')}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={8}>Đơn hàng chưa có sản phẩm</td>
                                    </tr>
                                )}
                                <tr>
                                    <td
                                        className={style.addInstock}
                                        colSpan={8}
                                        onClick={() => {
                                            if (item.TinhTrang > 2) {
                                                setAlert({
                                                    show: true,
                                                    type: 'warning',
                                                    message: `Tình trạng đơn hàng: ${orderStatusToText(
                                                        item.TinhTrang,
                                                    )}`,
                                                });
                                                return;
                                            }
                                            selectedOrderRef.current = {
                                                id_donhang: item.id,
                                            };
                                            setAddingDetail(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className={style.iconPlus} />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </orderDetailContext.Provider>
    );
}
export default InvoiceDetailTable;
