import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/contents/Breadcumb';
import style from './style.module.scss';
const AccountLayout = () => {
    const navigate = useNavigate();

    return (
        <div className={style.modal}>
            <div className={style.modalOverlay}></div>
            <Outlet />
        </div>
    );
};

export default AccountLayout;
