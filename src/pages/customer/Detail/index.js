import React, { useState, useEffect, useRef } from 'react';
import style from './style.module.scss';
import { formatMoney } from '~/ultis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCartPlus, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Alert from '~/components/infoModals/Alert';
import RequireLogin from '~/components/infoModals/AlertWarning';
import useLocalStorage from '~/hooks/useLocalStorage';
import Breadcrumb from '~/components/contents/Breadcumb';
const Detail = () => {
    const navigate = useNavigate();
    const [{ products }, setCart] = useOutletContext();
    const [itemsInCart, setItemsInCart] = useLocalStorage('cart', []);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (products) setLoading(false);
    }, [products]);
    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: '',
    });
    const { id } = useParams();
    const [newItem, setNewItem] = useState({
        id: id,
        SoLuong: 1,
        id_chitiet: '',
    });
    const instockRef = useRef();
    const [loginWarning, setLoginWarning] = useState(false);
    if (loading) return <h1>Đang tải ...</h1>;
    const foundProduct = products?.find((item) => item.id === parseInt(id));
    const isProductExistInCard = (product) => {
        let result = false;
        itemsInCart?.forEach((item) => {
            if (item.id === product.id && item.id_chitiet === product.id_chitiet) result = true;
        });
        return result;
    };
    const links = (() => {
        const gender = parseInt(sessionStorage.getItem('gender'));
        return [
            { location: -1, text: <FontAwesomeIcon icon={faArrowLeft} /> },
            { location: '/', text: 'Trang chủ' },
            {
                location: gender === 2 ? '/women' : '/men',
                text: gender === 2 ? 'Thời trang nữ' : 'Thời trang nam',
            },
            {
                location: '#',
                text: `${foundProduct.TenSP}`,
            },
        ];
    })();
    const addToCart = () => {
        if (!newItem.id_chitiet) {
            setAlert({
                show: true,
                type: 'warning',
                message: 'Vui lòng chọn size',
            });
            return;
        }

        if (isProductExistInCard(newItem)) {
            const itemsInCart = JSON.parse(localStorage.getItem('cart'));
            const newCart = itemsInCart.map((item) => {
                if (item.id_chitiet === newItem.id_chitiet)
                    return { ...item, SoLuong: newItem.SoLuong + item.SoLuong };
                else return item;
            });
            setItemsInCart(newCart);

            setAlert({
                show: true,
                type: 'sucess',
                message: 'Sản phẩm đã được thêm vào giỏ',
            });

            return;
        } else {
            setCart((prev) => prev + 1);
            setAlert({
                show: true,
                type: 'success',
                message: 'Sản phẩm đã được thêm vào giỏ',
            });
        }
        setItemsInCart([...itemsInCart, newItem]);
    };
    if (foundProduct) {
        return (
            <div className={style.wrapperDetail}>
                {loginWarning && <RequireLogin setShow={setLoginWarning} />}
                {alert.show && <Alert alert={alert} setAlert={setAlert} />}
                <div className={style.wrapperNavigate}>
                    <Breadcrumb links={links} />
                </div>
                <div className={style.Image}>
                    <img src={`http://localhost:3100/images/${foundProduct.TenAnh}`} alt="img" />
                </div>
                <div className={style.content}>
                    <p className={style.name}>{foundProduct.TenSP}</p>
                    <p className={style.price}>
                        <span>Đơn giá: </span>
                        {foundProduct.KhuyenMai > 0 && (
                            <span id={style.price}>{formatMoney(foundProduct.DonGia, ' ')} </span>
                        )}
                        <span className={style.Tien}>
                            {formatMoney(
                                foundProduct.DonGia -
                                    (foundProduct.DonGia * foundProduct.KhuyenMai) / 100,
                                'đ',
                            )}
                        </span>
                        {foundProduct.KhuyenMai > 0 && (
                            <span id={style.discount}>Giảm {foundProduct.KhuyenMai}%</span>
                        )}
                    </p>

                    <p className={style.size}>
                        <span>Size:</span>

                        <select
                            onChange={(e) => {
                                instockRef.current = foundProduct.ChiTiet.find(
                                    (instock) => instock.id === parseInt(e.target.value),
                                ).SoLuong;
                                setNewItem({
                                    ...newItem,
                                    id_chitiet: e.target.value,
                                    SoLuong: 1,
                                });
                            }}
                        >
                            <option disabled={newItem.id_chitiet}>Chọn size</option>
                            {foundProduct.ChiTiet?.map((item) => {
                                return (
                                    <option
                                        key={item.Size}
                                        value={item.id}
                                        disabled={item.SoLuong === 0}
                                    >
                                        {item.Size} {item.SoLuong === 0 && ' - Hết hàng'}
                                    </option>
                                );
                            })}
                        </select>
                        {newItem.id_chitiet && (
                            <span> Số lượng trong kho:{instockRef.current} </span>
                        )}
                    </p>

                    <p className={style.ship}>
                        <span>Vận chuyển: </span>
                        <span>
                            {' '}
                            <FontAwesomeIcon icon={faTruckFast} /> Miễn phí vận chuyển trên toàn
                            quốc
                        </span>
                    </p>
                    <div className={style.count}>
                        <span>Số lượng:</span>
                        <div className={style.btnCount}>
                            <button
                                className={style.prev}
                                disabled={newItem.SoLuong === 1}
                                onClick={() => {
                                    setNewItem({ ...newItem, SoLuong: newItem.SoLuong - 1 });
                                }}
                            >
                                -
                            </button>
                            <span>{newItem.SoLuong}</span>
                            <button
                                disabled={instockRef.current <= newItem.SoLuong}
                                onClick={() =>
                                    setNewItem({ ...newItem, SoLuong: newItem.SoLuong + 1 })
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={style.btnContent}>
                        <div className={style.btn} id={style.addBtn} onClick={() => addToCart()}>
                            <FontAwesomeIcon icon={faCartPlus} /> Thêm Vào Giỏ Hàng
                        </div>
                        <div
                            className={style.btn}
                            id={style.buyBtn}
                            onClick={() => navigate('/cart')}
                        >
                            Vào giỏ hàng
                        </div>
                    </div>
                </div>
                <div className={style.suport}>
                    <h3>Hỗ trợ trực tuyến</h3>
                    <div className={style.suportContent}>
                        <p>Bạn muốn hỏi về sản phẩm nào </p>
                        <p>Zalo/Hotline: 0360.000.222</p>
                        <p className={style.titleSuport}>Chính sách bán hàng</p>
                        <div className={style.policy}>
                            <p>
                                <span className={style.number}>1</span>{' '}
                                <span className={style.description}>Giao Hàng Toàn Quốc</span>
                            </p>
                            <p>
                                <span className={style.number}>2</span>{' '}
                                <span className={style.description}>Thanh Toán Khi Nhận Hàng</span>
                            </p>
                            <p>
                                <span className={style.number}>3</span>{' '}
                                <span className={style.description}>Đổi Trả Trong 7 Ngày</span>
                            </p>
                            <p>
                                <span className={style.number}>4</span>{' '}
                                <span className={style.description}>Hoàn Ngay Tiền Mặt</span>
                            </p>
                            <p>
                                <span className={style.number}>5</span>{' '}
                                <span className={style.description}>Chất Lượng Đảm Bảo</span>
                            </p>
                            <p>
                                <span className={style.number}>6</span>{' '}
                                <span className={style.description}>Hình Chụp Sản Phẩm Thật</span>
                            </p>
                            <p>
                                <span className={style.number}>7</span>{' '}
                                <span className={style.description}>Miễn Phí Giao Hàng</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <h1>Không tìm thấy sản phẩm</h1>;
};
export default Detail;
