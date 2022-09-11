import AdminHeader from '~/components/headers/AdminHeader';
import AdminSidebar from '~/components/sideBars/AdminSidebar';
import AdminFooter from '~/components/footers/AdminFooter';
import style from './style.module.scss';
import { Outlet } from 'react-router-dom';
function AdminLayout() {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <AdminHeader />
            </div>
            <div className={style.content}>
                <AdminSidebar />
                <Outlet />
            </div>
            <AdminFooter />
        </div>
    );
}

export default AdminLayout;
