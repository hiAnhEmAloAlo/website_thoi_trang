import style from './style.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import UserMenu from '~/components/contents/UserMenu';

function AdminHeader() {
    const navigate = useNavigate();
    return (
        <div className={style.header}>
            <img src={images.logo} alt="logo" onClick={() => navigate('/')} />
            <div className={style.account}>
                <UserMenu />
            </div>
        </div>
    );
}

export default AdminHeader;
