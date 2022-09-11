import style from '../style.module.scss';
import { useState, useEffect } from 'react';
import { getData, updateApi } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
function EditInstock({ selectedProduct, setEditting, setData, setAlert }) {
    const [inputValue, setInputValue] = useState(selectedProduct.instock.SoLuong);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);
    const validateInput = () => {
        if (!inputValue) {
            return {
                result: false,
                message: 'Không để trống số lượng',
            };
        }
        if (inputValue < 0) {
            return {
                result: false,
                message: 'Số lượng lớn hơn 0',
            };
        }

        return {
            result: true,
        };
    };

    const handleSubmit = async () => {
        let { result, message } = validateInput();
        if (result) {
            const dataUpdate = { SoLuong: inputValue };
            console.log(dataUpdate);
            const res = await updateApi('instock', selectedProduct.instock.id, dataUpdate);
            const reponse = await res.json();
            console.log(reponse);
            if (reponse?.status !== 'OK') {
                setAlert({
                    show: true,
                    type: 'error',
                    message: reponse.message,
                });
            } else {
                const newData = await getData();
                setData(newData);
                setEditting(false);
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Sửa thành công',
                });
            }
        } else {
            setAlert({
                show: true,
                type: 'error',
                message,
            });
        }
    };

    return (
        <div className={style.modalBody}>
            <div className={style.modalLayer}></div>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h3>Cập nhật số lượng sản phẩm</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={() => {
                            setEditting(false);
                        }}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên sản phẩm</label>
                        <input type="text" value={selectedProduct.TenSP} disabled></input>
                    </div>

                    <div className={style.modalInput}>
                        <label>Size</label>
                        <input
                            type="text"
                            value={selectedProduct.instock.Size}
                            disabled
                            placeholder="Nhập size..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Số Lượng</label>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value);
                            }}
                            placeholder="Nhập Số lượng ..."
                        ></input>
                    </div>

                    <div className={style.modalBtn}>
                        <button onClick={handleSubmit}>Hoàn thành</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditInstock;
