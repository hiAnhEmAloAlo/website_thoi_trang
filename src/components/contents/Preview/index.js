import style from './style.module.scss';
import { formatMoney } from '~/ultis';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Preview = ({ title, data, content = 'sale lên đến 80% xả hàng lần cuối!' }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    const firstIndex = currentPage * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const pageItems = data.slice(firstIndex, lastIndex);
    const goToNextPage = () => {
        if (currentPage >= numberOfPages - 1) setCurrentPage(0);
        else setCurrentPage(currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage <= 0) setCurrentPage(numberOfPages - 1);
        else setCurrentPage(currentPage - 1);
    };

    const goToViewAllPage = () => {
        sessionStorage.setItem('type', data[0].Loai);
        navigate('/products');
    };
    return (
        <div className={style.wrapperPreview}>
            <div className={style.title}>
                <div className={style.titleHeader}>{title}</div>
                <h2 className={style.titleContent}>
                    <span>{content}</span>
                </h2>
            </div>

            <div className={style.content}>
                <span className={style.btnPage} id={style.btnPre} onClick={goToPreviousPage}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </span>
                <span className={style.btnPage} id={style.btnNext} onClick={goToNextPage}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </span>
                {pageItems.map((item) => {
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
                                <span
                                    className={style.name}
                                    onClick={() => navigate(`/detail/${item.id}`)}
                                >
                                    {item.TenSP}
                                </span>
                                <p className={style.price}>
                                    {item.KhuyenMai > 0 && (
                                        <span className={style.priceMain}>
                                            {formatMoney(item.DonGia, ' ')}{' '}
                                        </span>
                                    )}
                                    <span>
                                        {formatMoney(
                                            item.DonGia - (item.DonGia * item.KhuyenMai) / 100,
                                            ' ₫',
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className={style.btnView} onClick={goToViewAllPage}>
                Xem tất cả sản phẩm
            </button>
        </div>
    );
};

export default Preview;
