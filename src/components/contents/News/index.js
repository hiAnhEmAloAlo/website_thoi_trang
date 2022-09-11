import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
const News = () => {
    return (
        <div className={style.nav}>
            <Link to="/women">SHOP NỮ</Link>
            <div className={style.text}>
                <p>Giảm giá lên đến 80% cho mọi sản phẩm</p>
                <p>Giảm giá lớn nhất trong mùa hè</p>
            </div>
            <Link to="/men">SHOP NAM</Link>
        </div>
    );
};

export default News;
