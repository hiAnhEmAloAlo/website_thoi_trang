import style from './style.module.scss';
// import { removeAccents } from '~/ultis';
import { getInvoice } from '~/webService';
import { useState, useEffect, createContext, useMemo } from 'react';
import Alert from '~/components/infoModals/Alert';
import InvoiceTable from './component/InvoiceTable';
import InvoiceDetailTable from './component/InvoiceDetailTable';
import SearchOptions from './component/SearchOptions';
import { orderStatusToText } from '~/ultis';
export const orderContext = createContext();
function Invoice() {
    const [filterOptions, setFilterOptions] = useState(null);
    const [data, setData] = useState([]);
    const [table, setTable] = useState('invoice');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        getInvoice().then(setData).catch(console.log);
    }, []);

    const filteredData = useMemo(() => {
        let result = data;
        if (!filterOptions) return result;
        if (filterOptions.Text) {
            result = result.filter((order) => {
                return (
                    order?.SDT?.startsWith(filterOptions.Text) ||
                    filterOptions?.Text?.startsWith(order.id)
                );
            });
        }
        if (filterOptions.Nam) {
            result = result?.filter((order) => {
                const date = new Date(order.NgayTao);
                const year = date.getFullYear();
                return year === filterOptions.Nam;
            });
        }
        if (filterOptions.Thang) {
            result = result.filter((order) => {
                const date = new Date(order.NgayTao);
                const month = date.getMonth() + 1;
                return month === filterOptions.Thang;
            });
        }

        if (filterOptions.TinhTrang) {
            result = result?.filter((order) => order.TinhTrang === filterOptions.TinhTrang);
        }
        return result;
    }, [filterOptions, data]);
    // console.log(filteredData);
    return (
        <orderContext.Provider
            value={{
                setData,
                setAlert,
            }}
        >
            <div className={style.wrapper}>
                {alert.show && <Alert alert={alert} setAlert={setAlert} />}

                <div className={style.content}>
                    <div className={style.nav}>
                        <div style={{ display: 'flex' }}>
                            <button
                                onClick={() => {
                                    setTable('invoice');
                                }}
                                className={table === 'invoice' ? style.active : null}
                            >
                                Đơn hàng
                            </button>
                            <button
                                onClick={() => {
                                    setTable('invoiceDetail');
                                }}
                                className={table === 'invoiceDetail' ? style.active : null}
                            >
                                Chi tiết đơn hàng{' '}
                            </button>
                            <div>
                                <SearchOptions
                                    setFilterOptions={setFilterOptions}
                                    filterOptions={filterOptions}
                                />
                            </div>
                        </div>
                    </div>
                    {table === 'invoice' && (
                        <InvoiceTable
                            data={filteredData}
                            setData={setData}
                            setAlert={setAlert}
                            setTable={setTable}
                            setFilterOptions={setFilterOptions}
                        />
                    )}
                    {table === 'invoiceDetail' && (
                        <InvoiceDetailTable
                            data={filteredData}
                            setData={setData}
                            setAlert={setAlert}
                        />
                    )}
                </div>
            </div>
        </orderContext.Provider>
    );
}

export default Invoice;
