import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import style from '../style.module.scss';
function RequireLogin({ setShow }) {
    const navigate = useNavigate();
    return (
        <div className={style.comfirmWrapper}>
            <div className={style.cofirmOverlay}></div>
            <div className={style.confirmContainer}>
                <div className={style.comfirmHeader}>
                    <h3>Thông báo</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        id={style.icon}
                        onClick={() => setShow(false)}
                    />
                </div>
                <div className={style.comfirmContent}>
                    <p>Vui lòng đăng nhập để tiếp tục</p>
                </div>
                <div className={style.comfirmBtn}>
                    <button
                        onClick={() => {
                            navigate('/account/login');
                            setShow(false);
                        }}
                    >
                        Đăng nhập
                    </button>
                    <button onClick={() => setShow(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default RequireLogin;
