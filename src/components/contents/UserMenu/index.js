import { faBox, faClose, faShopLock, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import useAuth from '~/hooks/useAuth';
import Alert from '~/components/infoModals/Alert';
const UserMenu = () => {
    const auth = useAuth();
    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: '',
    });
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = auth;
    return (
        <div className={style.wrapperUserMenu} onClick={() => setDisplayMenu(!displayMenu)}>
            <FontAwesomeIcon className={style.icon} icon={faUserLarge} />
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            {displayMenu && (
                <ul className={style.list} id={style.slideIn}>
                    {!auth.isLogin ? (
                        <li className={style.listItem}>
                            <p>
                                <span
                                    className={style.btnLogin}
                                    onClick={() => {
                                        navigate('account/login');
                                    }}
                                >
                                    Đăng nhập
                                </span>
                                <span
                                    onClick={() => {
                                        navigate('account/register');
                                    }}
                                >
                                    Đăng ký
                                </span>
                            </p>
                            <span onClick={() => setDisplayMenu(false)}>
                                <FontAwesomeIcon icon={faClose} className={style.icon} />
                            </span>
                        </li>
                    ) : (
                        <li className={style.listItem} id={style.login}>
                            <div className={style.title}>
                                <p>
                                    <span>
                                        Hi <span className={style.userName}>{userInfo.HoTen}</span>
                                    </span>
                                    <span
                                        onClick={() => {
                                            setAlert({
                                                show: true,
                                                type: 'success',
                                                message: 'Bạn vừa đăng xuất khỏi hệ thống',
                                            });
                                            auth.logout();
                                        }}
                                    >
                                        Đăng xuất
                                    </span>
                                </p>
                                <span>
                                    <FontAwesomeIcon icon={faClose} className={style.icon} />
                                </span>
                            </div>
                        </li>
                    )}
                    <li className={style.listItem}>
                        <span onClick={() => navigate('/my-account/my-detail')}>
                            <FontAwesomeIcon icon={faUserLarge} className={style.icon} /> Tài khoản
                            của tôi
                        </span>
                    </li>
                    <li className={style.listItem}>
                        <span onClick={() => navigate('/my-account/my-order')}>
                            <FontAwesomeIcon icon={faBox} className={style.icon} /> Đơn hàng của tôi
                        </span>
                    </li>
                    {userInfo?.Quyen > 0 && (
                        <li className={style.listItem} onClick={() => navigate('/admin/product')}>
                            <span>
                                <FontAwesomeIcon icon={faShopLock} className={style.icon} /> Trang
                                quản lý
                            </span>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
