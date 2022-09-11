import style from './style.module.scss';
import { formatMoney, removeAccents } from '~/ultis';
import { useState, useMemo, useRef, useContext } from 'react';
import { orderDetailContext } from '../../InvoiceDetailTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function FindPoduct({ data }) {
    const product = useRef();
    const [showInfo, setShowInfo] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { setAlert } = useContext(orderDetailContext);
    const filteredData = useMemo(() => {
        return data?.filter((item) => {
            const itemName = removeAccents(item.TenSP).toLowerCase();
            const findName = removeAccents(filterValue).toLowerCase();

            return itemName.includes(findName);
        });
    }, [filterValue, data]);
    const handleSaveProductId = (text) => {
        navigator.clipboard.writeText(text);
        setAlert({
            show: true,
            message: 'Đã lưu mã sản phẩm',
            type: 'success',
        });
    };

    if (!showInfo) {
        return (
            <div className={style.wrapper}>
                <div className={style.title}>Thông tin sản phẩm</div>
                <div className={style.headerSearch}>
                    <div className={style.searchWapper}>
                        {' '}
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setFilterValue(inputValue);
                            }}
                        />
                        <span>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </div>
                    {filterValue && (
                        <span className={style.btnRemoveFilter} onClick={() => setFilterValue('')}>
                            Bỏ tìm kiếm
                        </span>
                    )}
                </div>
                <div className={style.content}>
                    <div className={style.wrapperTblPro}>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Mã SP</th>
                                    <th>Tên SP </th>
                                    <th>Loại SP</th>
                                    <th>Đơn giá</th>
                                    <th>Khuyến mãi</th>
                                    {/* <th>Đối tượng</th> */}
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>
                                                <div className={style.nameWrapper}>
                                                    <span>{item.TenSP}</span>
                                                </div>
                                            </td>

                                            <td>{item.Loai}</td>

                                            <td>{formatMoney(item.DonGia, 'đ')}</td>
                                            <td>{`${item.KhuyenMai} %`}</td>
                                            {/* <td>{item.GioiTinh}</td> */}
                                            <td>
                                                <span
                                                    className={style.btnSave}
                                                    onClick={() => {
                                                        product.current = {
                                                            id: item.id,
                                                            TenSP: item.TenSP,
                                                            Loai: item.Loai,
                                                            DonGia: item.DonGia,
                                                            KhuyenMai: item.KhuyenMai,
                                                        };
                                                        setShowInfo(true);
                                                        handleSaveProductId(item.id);
                                                    }}
                                                >
                                                    Chọn
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={style.wrapperInfo}>
                <div className={style.header}>Thông tin sản phẩm</div>
                <div className={style.form}>
                    <div className={style.inputGroup}>
                        <label>Mã sản phẩm </label>
                        <input disabled type="text" value={product.current.id} />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Tên sản phẩm </label>
                        <input disabled type="text" value={product.current.TenSP} />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Loại </label>
                        <input disabled type="text" value={product.current.Loai} />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Đơn giá</label>
                        <input disabled type="text" value={product.current.DonGia} />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Đơn khuyến mãi</label>
                        <input disabled type="text" value={product.current.KhuyenMai} />
                    </div>

                    <div className={style.btnSubmit} id={style.change}>
                        <button onClick={() => setShowInfo(false)}>Quay lại tìm kiếm</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FindPoduct;
