import style from './style.module.scss';
import { formatMoney } from '~/ultis';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const ViewProduct = ({ data, hasFilter = false }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const numberOfPages = Math.ceil(data?.length / itemsPerPage);
    const firstIndex = currentPage * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    const pageItems = data.slice(firstIndex, lastIndex);
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
        if (currentPage)
            window.scrollTo({
                top: 500,
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

    if (pageItems.length)
        return (
            <div className={style.wrapperViewAll}>
                <div className={style.content} id={hasFilter ? style.noFilter : null}>
                    {pageItems?.map((item) => {
                        return (
                            <div className={style.itemContent} key={item.id}>
                                {item.ChiTiet?.length === 0 && (
                                    <div className={style.noInstock}>Hết hàng</div>
                                )}
                                <div
                                    className={style.img}
                                    onClick={() => navigate(`/detail/${item.id}`)}
                                >
                                    <img
                                        src={`http://localhost:3100/images/${item.TenAnh}`}
                                        alt="aa"
                                    />
                                    {item.KhuyenMai > 0 && (
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
                                                {formatMoney(item.DonGia, ' ₫')}
                                            </span>
                                        )}
                                        <span>
                                            {formatMoney(
                                                item.DonGia * (1 - item.KhuyenMai / 100),
                                                '₫',
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={style.pagition}>
                    <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    {number.map((item) => (
                        <button
                            key={item}
                            className={item - 1 === currentPage ? style.pageActive : null}
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
    else
        return (
            <div className={style.noFindProduct}>
                Không tìm thấy sản phẩm phù hợp với yêu cầu của bạn
            </div>
        );
};

export default ViewProduct;
