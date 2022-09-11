import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import {
    faPenToSquare,
    faTrash,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { formatMoney } from '~/ultis';
import style from './style.module.scss';
import ModalAddProduct from './ModalAddProduct';
import { deleteApi, getData } from '~/webService';
import ModalEditProduct from './ModalEditProduct';
import AlertWarning from '~/components/infoModals/AlertWarning';
function ProductTable(props) {
    const { setAlert } = props;
    const [deleting, setDeleting] = useState(false);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const selectedProductRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(props.data?.length / itemsPerPage);
    const firstIndex = currentPage * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const pageItems = props.data.slice(firstIndex, lastIndex);
    const number = [];
    (() => {
        for (let i = 1; i <= numberOfPages; i++) {
            number.push(i);
        }
    })();
    const handlePageNumber = (number) => {
        console.log(number);
        setCurrentPage(number);
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);
    const goToNextPage = () => {
        if (currentPage >= numberOfPages - 1) setCurrentPage(0);
        else setCurrentPage(currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage <= 0) setCurrentPage(numberOfPages - 1);
        else setCurrentPage(currentPage - 1);
    };
    const handleToggleModalAdd = () => {
        setShow(!show);
    };

    const handleDelete = async () => {
        try {
            console.log(selectedProductRef.current.id);
            const res = await deleteApi('product', selectedProductRef.current.id);
            const json = await res.json();
            console.log(json);
            const newData = await getData();
            props.setData(newData);
            setAlert({
                show: true,
                message: 'Xóa thành công',
                type: 'success',
            });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className={style.wrapperTblPro}>
            <div className={style.wrapperBtn}>
                <button className={style.btnAdd} onClick={handleToggleModalAdd}>
                    Thêm sản phẩm
                </button>
            </div>
            {deleting && (
                <AlertWarning
                    setDeleting={setDeleting}
                    handleDelete={handleDelete}
                    selectedProductId={selectedProductRef.current.id}
                />
            )}
            {show === true ? (
                <ModalAddProduct
                    setData={props.setData}
                    setAlert={setAlert}
                    setShow={setShow}
                    productTypes={props.productTypes}
                    handleToggleModalAdd={handleToggleModalAdd}
                />
            ) : null}
            {showEdit === true ? (
                <ModalEditProduct
                    setAlert={setAlert}
                    setData={props.setData}
                    selectedProduct={{ ...selectedProductRef.current }}
                    setShowEdit={setShowEdit}
                />
            ) : null}
            <table border="1">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Loại sản phẩm</th>
                        <th>Đối tượng </th>
                        <th>Đơn giá</th>
                        <th>Khuyến mãi</th>
                        <th colSpan="3">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {pageItems.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <div className={style.nameWrapper}>
                                        <span className={style.name}>{item.TenSP}</span>
                                        <span className={style.fullName}>{item.TenSP}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={style.imgWrapper}>
                                        <img
                                            src={`http://localhost:3100/images/${item.TenAnh}`}
                                            alt="img"
                                        />
                                    </div>
                                </td>
                                <td>{item.Loai}</td>
                                <td>
                                    {item.GioiTinh === 1
                                        ? 'Nam'
                                        : item.GioiTinh === 2
                                        ? 'Nữ'
                                        : 'Cả hai'}
                                </td>
                                <td>{formatMoney(item.DonGia, ' vnđ')}</td>
                                <td>{item.KhuyenMai}%</td>
                                <td>
                                    <button
                                        className={style.edit}
                                        onClick={() => {
                                            selectedProductRef.current = item;
                                            setShowEdit(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={style.delete}
                                        onClick={() => {
                                            selectedProductRef.current = item;
                                            setDeleting(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Xóa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={style.edit}
                                        onClick={() => {
                                            props.setFilterValue(item.TenSP);
                                            props.setTable('instock');
                                        }}
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={style.pagination}>
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {number.map((item) => (
                    <button
                        className={item - 1 === currentPage ? style.pageActive : null}
                        key={item}
                        onClick={() => handlePageNumber(item - 1)}
                    >
                        {item}
                    </button>
                ))}
                <button onClick={goToNextPage} disabled={numberOfPages === currentPage + 1}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
}
export default ProductTable;
