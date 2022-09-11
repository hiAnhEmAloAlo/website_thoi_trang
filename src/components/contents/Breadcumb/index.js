import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import style from './style.module.scss';
export default function Breadcrumb({ links }) {
    const length = links.length;
    return (
        <div className={style.navigate}>
            {links.map((link, index) => (
                <div key={index} className={style.navLink}>
                    <NavLink
                        to={link.location}
                        className={({ isActive }) => (isActive ? style.active : style.noActive)}
                    >
                        {link.text}
                    </NavLink>
                    {index < length - 1 && ' /'}
                </div>
            ))}
        </div>
    );
}
