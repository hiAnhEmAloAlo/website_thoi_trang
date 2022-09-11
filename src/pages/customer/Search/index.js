import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import ViewProduct from '~/components/contents/ViewProduct';
import { removeAccents } from '~/ultis';
import style from './style.module.scss';
import Breadcrumb from '~/components/contents/Breadcumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Search() {
    const [{ products }] = useOutletContext();
    const { q } = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (products) setLoading(false);
    }, [products]);
    if (loading) return <h1>loading...</h1>;
    const filteredData = products.filter((item) => {
        const filterValue = q.replaceAll('-', ' ');
        const filterName = removeAccents(item.TenSP);
        const filterType = removeAccents(item.Loai);
        return (
            filterName.toLowerCase().includes(filterValue.toLowerCase()) ||
            filterType.toLowerCase().includes(filterValue.toLowerCase())
        );
    });
    return (
        <div className={style.wapperSearchPage}>
            <div className={style.navLink}>
                <Breadcrumb
                    links={[
                        { location: -1, text: <FontAwesomeIcon icon={faArrowLeft} /> },
                        { location: '/', text: 'Về trang chủ' },
                        { location: '#', text: 'Tìm kiếm' },
                    ]}
                />
            </div>
            <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>
                Kết quả tìm kiếm cho {q.replaceAll('-', ' ')}
            </h1>
            <ViewProduct data={filteredData} hasFilter={true} />
        </div>
    );
}
