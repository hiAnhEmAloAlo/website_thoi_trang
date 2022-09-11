import style from './style.module.scss';
import images from '~/assets/images';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faBars,
    faHeart,
    faSearch,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import UserMenu from '~/components/contents/UserMenu';
import useLocalStorage from '~/hooks/useLocalStorage';
import CustomerSearchBar from '~/components/searchBars/CustomerSearchBar';
import useAuth from '~/hooks/useAuth';
import { useState } from 'react';
function CustomerHeader({ cart, data }) {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const auth = useAuth();
    return (
        <>
            <div className={style.headerHome}>
                <div className={style.headerRight}>
                    <div className={style.image}>
                        <Link to="/">
                            <img src={images.logo} alt="logo" />
                        </Link>
                    </div>
                    <div className={style.gender}>
                        <Link to="/women">
                            <p id={style.line}>NỮ</p>
                        </Link>
                        <Link to="/men">
                            <p>NAM</p>
                        </Link>
                    </div>
                </div>
                <div className={style.headerLeft}>
                    <div className={style.headerSearch}>
                        <CustomerSearchBar data={data} />
                    </div>
                    <div className={style.icons}>
                        <UserMenu />
                        <FontAwesomeIcon icon={faHeart} />
                        <span className={style.cart} onClick={() => navigate('/cart')}>
                            <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
                            <span className={style.count}>{cart}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.headerTapletMobile}>
                <div className={style.headerTapletMobileLeft}>
                    <div className={style.navBarTapletMobile}>
                        <ul className={style.wapperNav}>
                            <div className={style.Bars} onClick={() => setShowNav(true)}>
                                <span>
                                    <FontAwesomeIcon icon={faBars} className={style.icon} />
                                </span>
                                
                            </div>
                        </ul>
                    </div>
                    <div className={style.logo} onClick={() => navigate('/')}>
                        <img src={images.logo} />
                    </div>
                </div>
                <div className={style.headerTapletMobileRight}>
                    {showSearch && <CustomerSearchBar data={data} />}
                    <span className={style.searchTapLet}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            onClick={() => setShowSearch(!showSearch)}
                        />
                    </span>
                    <span onClick={() => navigate('/my-account/my-detail')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBagShopping} onClick={() => navigate('/cart')} />
                    </span>
                </div>
            </div>
        </>
    );
}

export default CustomerHeader;
