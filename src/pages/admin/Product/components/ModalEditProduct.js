import style from '../style.module.scss';
import { useState, useRef, useEffect } from 'react';
import { getData, updateApi } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import { validator, removeAccents } from '~/ultis';
function ModalEditProduct({ selectedProduct, setData, setShowEdit, setAlert }) {
    const [checked, setChecked] = useState(selectedProduct.GioiTinh);
    const [inputValue, setInputValue] = useState({
        TenSP: selectedProduct.TenSP,
        Loai: selectedProduct.Loai,
        DonGia: selectedProduct.DonGia,
        GioiTinh: selectedProduct.GioiTinh,
        KhuyenMai: selectedProduct.KhuyenMai,
    });
    console.log('Input', inputValue);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);
    const gender = [
        {
            id: 1,
            name: 'Nam',
        },
        {
            id: 2,
            name: 'Nữ',
        },
        {
            id: 3,
            name: 'Cả hai',
        },
    ];
    const inputRef = useRef();
    const [previewIMG, setPreviewIMG] = useState();
    const handlePreviewIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file);
        setPreviewIMG(file);
    };

    const validateInput = () => {
        const arr = ['TenSP', 'Loai', 'DonGia', 'KhuyenMai'];
        for (let i = 0; i < arr.length; i++) {
            // console.log(inputValue[arr[i]]);
            if (inputValue[arr[i]] === '') {
                return {
                    result: false,
                    message: 'Không được để trống thông tin',
                };
            }
        }

        if (!validator.noSpecialCharacters(inputValue.TenSP)) {
            return {
                result: false,
                message: 'Tên sản phẩm không hợp lệ',
            };
        }
        const typeValue = removeAccents(inputValue.Loai.trim().toLowerCase());
        if (typeValue.includes('chon loai') || typeValue.includes('them loai')) {
            return {
                result: false,
                message: 'Tên loại không hợp lệ',
            };
        }
        if (!validator.positive(inputValue.DonGia)) {
            return {
                result: false,
                message: 'Đơn giá phải > 1000',
            };
        }
        if (!validator.percent(inputValue.KhuyenMai)) {
            return {
                result: false,
                message: 'Khuyến mãi [0,100]',
            };
        }
        return {
            result: true,
        };
    };

    const handleUpdate = async () => {
        let { result, message } = validateInput();

        console.log(result, message);
        if (result) {
            const res = await updateApi('product', selectedProduct.id, inputValue);
            const reponse = await res.json();
            if (reponse?.status !== 'OK') {
                setAlert({
                    type: 'error',
                    message: reponse?.message,
                    show: true,
                });
                return;
            } else {
                if (inputValue.Anh) {
                    const myForm = new FormData();
                    myForm.append('product', inputValue.Anh);
                    const res = await fetch(
                        `http://localhost:3100/api/product/upload/${selectedProduct.id}`,
                        {
                            method: 'POST',
                            body: myForm,
                        },
                    );
                    const json = await res.json();
                    console.log('anh....', json);
                }
                const newData = await getData();
                console.log('new data', newData);
                await setData(newData);
                setShowEdit(false);
                setAlert({
                    type: 'success',
                    message: 'Sửa thành công',
                    show: true,
                });
            }
        } else {
            setAlert({
                type: 'error',
                message,
                show: true,
            });
        }
    };
    return (
        <div className={style.modalBody}>
            <div className={style.modalLayer}></div>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h3>Sửa thông tin sản phẩm</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={() => setShowEdit(false)}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            value={inputValue.TenSP}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, TenSP: event.target.value });
                            }}
                            placeholder="Nhập tên sản phẩm ..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Loại sản phẩm</label>
                        <input
                            type="text"
                            value={inputValue.Loai}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, Loai: event.target.value });
                            }}
                            placeholder="Nhập loại sản phẩm ..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Đối tượng</label>
                        <div className={style.gender}>
                            {gender.map((item) => {
                                return (
                                    <div key={item.id} className={style.genderItem}>
                                        <input
                                            type="radio"
                                            onChange={() => {
                                                setChecked(item.id);
                                                setInputValue({ ...inputValue, GioiTinh: item.id });
                                            }}
                                            checked={checked === item.id}
                                        />
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.modalInput}>
                        <label>Đơn giá</label>
                        <input
                            type="number"
                            value={inputValue.DonGia}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, DonGia: event.target.value });
                            }}
                            placeholder="Nhập đơn giá ..."
                        ></input>
                    </div>
                    <div className={style.modalInput}>
                        <label>Khuyến mãi (%)</label>
                        <input
                            type="number"
                            value={inputValue.KhuyenMai}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, KhuyenMai: event.target.value });
                            }}
                            placeholder="Nhập khuyến mãi ..."
                        ></input>
                    </div>
                    <div className={style.addImg}>
                        <input
                            ref={inputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                                handlePreviewIMG(event);
                                setInputValue({ ...inputValue, Anh: event.target.files[0] });
                            }}
                        ></input>
                        <button
                            onClick={(e) => {
                                inputRef.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faUpload} /> Chọn ảnh
                        </button>
                        <div className={style.previewIMG}>
                            {previewIMG ? (
                                <img src={previewIMG.preview} alt="img" />
                            ) : (
                                <img
                                    src={`http://localhost:3100/images/${selectedProduct.TenAnh}`}
                                    alt="anh"
                                />
                            )}
                        </div>
                    </div>
                    <div className={style.modalBtn}>
                        <button onClick={handleUpdate}>Hoàn tất</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalEditProduct;
