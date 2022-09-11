import style from './style.module.scss';
import { formatMoney } from '~/ultis';

export default function CartItem({ data, setItemsInCart, itemsInCart, setCart }) {
    console.log(data);
    const handleQuantityChange = (value) => {
        if (value === '+') {
            const newCart = itemsInCart?.map((item) => {
                if (item.id_chitiet === data.id_chitiet)
                    return { ...item, SoLuong: item.SoLuong + 1 };
                else return item;
            });
            setItemsInCart(newCart);
        } else if (value === '-') {
            const newCart = itemsInCart?.map((item) => {
                if (item.id_chitiet === data.id_chitiet)
                    return { ...item, SoLuong: item.SoLuong - 1 };
                else return item;
            });
            setItemsInCart(newCart);
        } else return;
    };
    return (
        <div className={style.wrappperCartItem}>
            <div className={style.img}>
                <img src={`http://localhost:3100/images/${data.TenAnh}`} alt="img" />
            </div>
            <div className={style.content}>
                <p className={style.name}>{data.TenSP}</p>
                <p>Size: {data.Size}</p>
                <p className={style.price}>
                    {data.GiaGoc !== data.GiaKM && (
                        <span id={style.price}>{formatMoney(data.GiaGoc, '₫')}</span>
                    )}
                    Giá: <span>{formatMoney(data.GiaKM, '₫')}</span>
                </p>

                <div className={style.btnCount}>
                    <button
                        disabled={data.SoLuong <= 1}
                        className={style.prev}
                        onClick={() => handleQuantityChange('-')}
                    >
                        -
                    </button>
                    <span>{data.SoLuong}</span>
                    <button
                        onClick={() => handleQuantityChange('+')}
                        disabled={data.SoLuong >= data.SoLuongKho}
                    >
                        +
                    </button>
                </div>
                <p className={style.totalPrice}>
                    Thành tiền: {formatMoney(data.GiaKM * data.SoLuong, '₫')}
                </p>
                <button
                    className={style.deleteCart}
                    onClick={() => {
                        setCart((pre) => pre - 1);
                        const newCart = itemsInCart?.filter(
                            (cartItem) => cartItem.id_chitiet !== data.id_chitiet,
                        );
                        setItemsInCart(newCart);
                    }}
                >
                    Xóa
                </button>
            </div>
        </div>
    );
}
