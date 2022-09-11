import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { removeAccents } from '~/ultis';
import AlertWarning from '~/components/infoModals/AlertWarning';
import { useState, useEffect, useMemo, useRef } from 'react';
import Alert from '~/components/infoModals/Alert';
import { getUsers, deleteApi } from '~/webService';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import SearchCustomer from './components/SearchCustomer';

function Customer() {
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const customer = useRef();
    const [filterValue, setFilterValue] = useState('');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: '',
    });
    useEffect(() => {
        getUsers().then(setData).catch(console.log);
    }, []);
    const handleDelete = async (id) => {
        const reponse = await deleteApi('user', id);
        const json = await reponse.json();
        const res = await getUsers();
        setData(res);
    };
    console.log(data);
    const filterdData = useMemo(() => {
        return data?.filter((item) => {
            const itemName = removeAccents(item.HoTen).toLowerCase();
            const findName = removeAccents(filterValue).toLowerCase();

            return itemName.includes(findName);
        });
    }, [filterValue, data]);
    const handleEdit = () => {
        setEditing(true);
    };
    return (
        <div className={style.wrapper}>
            <SearchCustomer data={data} setFilterValue={setFilterValue} filterValue={filterValue} />
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}

            <div className={style.content}>
                <div className={style.wrapperTblPro}>
                    <div className={style.wrapperBtn}>
                        <button onClick={() => setAdding(true)} className={style.btnAdd}>
                            Thêm khách hàng
                        </button>
                    </div>
                    {deleting && (
                        <AlertWarning
                            setDeleting={setDeleting}
                            handleDelete={handleDelete}
                            selectedProductId={customer.current.id}
                        />
                    )}
                    {adding && (
                        <AddCustomer setAdding={setAdding} setData={setData} setAlert={setAlert} />
                    )}
                    {editing && (
                        <EditCustomer
                            setEditing={setEditing}
                            setData={setData}
                            selectedCustomer={{ ...customer.current }}
                            setAlert={setAlert}
                        />
                    )}

                    <table border="1">
                        <thead>
                            <tr>
                                <th>Mã khách hàng</th>
                                <th>Họ tên </th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Email </th>
                                <th>Tên tài khoản</th>
                                <th colSpan="2">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterdData?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <div className={style.nameWrapper}>
                                                <span>{item.HoTen}</span>
                                            </div>
                                        </td>

                                        <td>{item.SDT}</td>

                                        <td>{item.DiaChi}</td>

                                        <td>{item.Email}</td>
                                        <td>{item.TenTaiKhoan}</td>
                                        <td>
                                            <button
                                                className={style.edit}
                                                onClick={() => {
                                                    customer.current = {
                                                        id: item.id,
                                                        HoTen: item.HoTen,
                                                        SDT: item.SDT,
                                                        DiaChi: item.DiaChi,
                                                        Email: item.Email,
                                                        TenTaiKhoan: item.TenTaiKhoan,
                                                    };
                                                    handleEdit(item.id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} /> Cập nhật
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customer;
