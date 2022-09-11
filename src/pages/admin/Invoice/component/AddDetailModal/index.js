import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import AddOrder from './AddOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getData } from '~/webService';
import FindPoduct from './FindPoduct';

const AddDetailModal = ({ setAddingDetail }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData().then(setData).catch(console.log);
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    return (
        <div className={style.wrapperAddOrder}>
            <div className={style.container}>
                <div className={style.title}>
                    <span>Thêm sản phẩm cho đơn hàng</span>
                    <span onClick={() => setAddingDetail(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <div className={style.content}>
                    <div className={style.customer}>
                        <FindPoduct data={data.products} />
                    </div>
                    <div className={style.order}>
                        <AddOrder products={data.products} setAdding={setAddingDetail} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDetailModal;
