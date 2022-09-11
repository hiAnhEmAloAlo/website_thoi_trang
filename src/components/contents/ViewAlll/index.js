import style from './style.module.scss';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { formatMoney } from '~/ultis';
import Filter from '../Filter';
import { useState, useMemo } from 'react';
const ViewAll = () => {
    const navigate = useNavigate();
    const [{ products, types: productTypes }] = useOutletContext();
    const newPrice = products?.map((item) => {
        return {
            ...item,
            DonGia: item.DonGia - (item.DonGia * item.KhuyenMai) / 100,
            cost: item.DonGia,
        };
    });
    const [filterOptions, setFilterOptions] = useState(() => {
        return {
            gender: JSON.parse(localStorage.getItem('gender')) ?? 1,
            type: sessionStorage.getItem('type') ?? '',
        };
    });
    const filteredData = useMemo(() => {
        let result = newPrice?.filter(
            (item) => item.GioiTinh === filterOptions.gender || item.GioiTinh === 3,
        );

        if (filterOptions.type) result = result?.filter((item) => item.Loai === filterOptions.type);

        if (filterOptions.price) {
            if (filterOptions.price === 'increase') {
                result = result?.sort((a, b) => parseFloat(a.DonGia) - parseFloat(b.DonGia));
                return result;
            } else if (filterOptions.price === 'reduce') {
                result = result?.sort((a, b) => parseFloat(b.DonGia) - parseFloat(a.DonGia));
                return result;
            }
            result = result.filter((item) => item.DonGia <= filterOptions.price);
        }
        return result;
    }, [products, filterOptions.gender, filterOptions.type, filterOptions.price]);
    return (
        <div className={style.wrapperViewAll}>
            <div></div>
            <Filter
                data={productTypes}
                setFilterOptions={setFilterOptions}
                filterOptions={filterOptions}
            />
            <div className={style.content}>
                {filteredData?.map((item) => {
                    return (
                        <div className={style.itemContent} key={item.id}>
                            <div
                                className={style.img}
                                onClick={() => navigate(`/detail/${item.id}`)}
                            >
                                <img src={`http://localhost:3100/images/${item.TenAnh}`} alt="aa" />
                                {item.KhuyenMai && (
                                    <span className={style.discount}>-{item.KhuyenMai}%</span>
                                )}
                            </div>
                            <div className={style.itemInfo}>
                                <div className={style.nameWrapper}>
                                    <span
                                        className={style.name}
                                        onClick={() => {
                                            navigate(`/detail/${item.id}`);
                                        }}
                                    >
                                        {item.TenSP}
                                    </span>
                                    <span className={style.fullName}>{item.TenSP}</span>
                                </div>

                                <p className={style.price}>
                                    {item.KhuyenMai > 0 && (
                                        <span className={style.priceMain}>
                                            {formatMoney(item.cost, ' ')}{' '}
                                        </span>
                                    )}
                                    <span className={style.monney}>
                                        {formatMoney(item.DonGia, ' ₫')}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewAll;
