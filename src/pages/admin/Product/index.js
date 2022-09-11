import style from './style.module.scss';
import AdminSearchBar from '~/components/searchBars/AdminSearchBar';
import ProductTable from './components/ProductTable';
import { removeAccents } from '~/ultis';
import { getData } from '~/webService';
import { useState, useEffect, useMemo } from 'react';
import InstockTable from './components/InstockTable';
import Alert from '~/components/infoModals/Alert';

function Product() {
    const [filterValue, setFilterValue] = useState('');
    const [data, setData] = useState([]);
    const [table, setTable] = useState('product');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: '',
    });
    const { products = [], types: productTypes = [] } = data;
    useEffect(() => {
        getData().then(setData).catch(console.log);
    }, []);
    const filterdData = useMemo(() => {
        return products.filter((item) => {
            const itemName = removeAccents(item.TenSP).toLowerCase();
            const findName = removeAccents(filterValue).toLowerCase();
            const typeName = removeAccents(item.Loai).toLowerCase();
            return itemName.includes(findName) || typeName.includes(findName);
        });
    }, [filterValue, products]);

    return (
        <div className={style.wrapper}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <AdminSearchBar
                setFilterValue={setFilterValue}
                data={products}
                filterValue={filterValue}
            />
            <div className={style.content}>
                <div className={style.nav}>
                    <div>
                        <button
                            onClick={() => {
                                setTable('product');
                                setFilterValue('');
                            }}
                            className={table === 'product' ? style.active : null}
                        >
                            Thông tin sản phẩm
                        </button>
                        <button
                            onClick={() => {
                                setTable('instock');
                                setFilterValue('');
                            }}
                            className={table === 'instock' ? style.active : null}
                        >
                            Chi tiết sản phẩm{' '}
                        </button>
                    </div>
                </div>
                {table === 'instock' && (
                    <InstockTable data={filterdData} setData={setData} setAlert={setAlert} />
                )}
                {table === 'product' && (
                    <ProductTable
                        setAlert={setAlert}
                        setFilterValue={setFilterValue}
                        data={filterdData}
                        productTypes={productTypes}
                        setData={setData}
                        setTable={setTable}
                    />
                )}
            </div>
        </div>
    );
}

export default Product;
