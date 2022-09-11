import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserGroup,
    faBarsProgress,
    faNoteSticky,
    faUser,
    faHome,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
function AdminSidebar() {
    const auth = useAuth();
    return (
        <div className={style.wrapper}>
            <ul>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? style.active : style.inactive)}
                >
                    <li className={style.list}>
                        <FontAwesomeIcon className={style.icon} icon={faHome} />
                        Trang chủ
                    </li>
                </NavLink>
                <NavLink
                    to="/admin/customer"
                    className={({ isActive }) => (isActive ? style.active : style.inactive)}
                >
                    <li className={style.list}>
                        <FontAwesomeIcon className={style.icon} icon={faUserGroup} />
                        Quản lý khách hàng
                    </li>
                </NavLink>

                <NavLink
                    to="/admin/product"
                    className={({ isActive }) => (isActive ? style.active : style.inactive)}
                >
                    <li className={style.list}>
                        <FontAwesomeIcon className={style.icon} icon={faBarsProgress} /> Quản lý sản
                        phẩm
                    </li>
                </NavLink>
                <NavLink
                    to="/admin/order"
                    className={({ isActive }) => (isActive ? style.active : style.inactive)}
                >
                    <li className={style.list}>
                        <FontAwesomeIcon className={style.icon} icon={faNoteSticky} /> Quản lý đơn
                        hàng
                    </li>
                </NavLink>
                {auth.userInfo.Quyen > 1 && (
                    <NavLink
                        to="/manager/account"
                        className={({ isActive }) => (isActive ? style.active : style.inactive)}
                    >
                        <li className={style.list}>
                            <FontAwesomeIcon className={style.icon} icon={faUser} /> Quản lý người
                            dùng
                        </li>
                    </NavLink>
                )}
            </ul>
        </div>
    );
}

export default AdminSidebar;
