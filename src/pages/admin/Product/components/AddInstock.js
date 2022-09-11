import style from '../style.module.scss';
import { useState, useEffect } from 'react';
import { AddApi, getData } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
function AddInstock(props) {
    const { setAlert } = props;
    const [inputValue, setInputValue] = useState({
        Size: '',
        SoLuong: '',
    });
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    const validateInput = () => {
        const arr = ['Size', 'SoLuong'];
        for (let i = 0; i < arr.length; i++) {
            // console.log(inputValue[arr[i]]);
            if (!inputValue[arr[i]]) {
                return {
                    result: false,
                    message: 'Không được để trống thông tin ',
                };
            }
            if (inputValue.SoLuong < 0) {
                return {
                    result: false,
                    message: 'Số lượng sản phẩm lớn hơn 0',
                };
            }
        }
        return {
            result: true,
        };
    };

    const handleSubmit = async () => {
        let { message, result } = validateInput();
        if (result) {
            const dataUpdate = { ...inputValue, id_sanpham: props.selectedProduct.id };
            const res = await AddApi('instock', dataUpdate);
            const reponse = await res.json();
            console.log(reponse);
            if (reponse.status !== 'OK') {
                setAlert({
                    show: true,
                    type: 'error',
                    message: reponse.message,
                });
                return;
            } else {
                const newData = await getData();
                await props.setData(newData);
                props.setAdding(false);
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Thêm thành công',
                });
            }
        } else {
            setAlert({
                show: true,
                type: 'warning',
                message,
            });
        }
    };

    return (
        <div className={style.modalBody}>
            <div className={style.modalLayer}></div>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h3>Thêm số lượng sản phẩm</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={() => {
                            props.setAdding(false);
                        }}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên sản phẩm</label>
                        <input type="text" value={props.selectedProduct?.TenSP} disabled></input>
                    </div>

                    <div className={style.modalInput}>
                        <label>Size</label>
                        <input
                            type="text"
                            value={inputValue.Size}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, Size: event.target.value });
                            }}
                            placeholder="Nhập size..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Số Lượng</label>
                        <input
                            type="number"
                            value={inputValue.SoLuong}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, SoLuong: event.target.value });
                            }}
                            placeholder="Nhập Số lượng ..."
                        ></input>
                    </div>

                    <div className={style.modalBtn}>
                        <button onClick={handleSubmit}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddInstock;
