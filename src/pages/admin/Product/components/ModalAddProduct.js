import style from '../style.module.scss';
import { useEffect, useRef, useState } from 'react';
import { addProduct, getData } from '~/webService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { validator, removeAccents } from '~/ultis';
function ModalAddProduct(props) {
    const inputRef = useRef();
    const [previewIMG, setPreviewIMG] = useState();
    const { setAlert } = props;
    const [selectedType, setSelectedType] = useState('');
    const [checked, setChecked] = useState(1);
    const [inputValue, setInputValue] = useState({
        TenSP: '',
        Loai: '',
        DonGia: '',
        GioiTinh: 1,
        KhuyenMai: 0,
        Anh: '',
    });
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
    const handlePreviewIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file);
        setPreviewIMG(file);
    };
    useEffect(() => {
        return () => {
            previewIMG && URL.revokeObjectURL(previewIMG.preview);
        };
    }, [previewIMG]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    const handleTypeChange = (e) => {
        if (e.target.value === 'Thêm loại') {
            setInputValue({ ...inputValue, Loai: '' });
            setSelectedType(e.target.value);
        } else {
            setInputValue({ ...inputValue, Loai: e.target.value });
            setSelectedType(e.target.value);
        }
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
        if (!inputValue.Anh) {
            return {
                result: false,
                message: 'Vui lòng thêm ảnh',
            };
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
    const normalizeName = (name) => {
        let newName = name.trim();
        newName = newName.replace(newName[0], newName[0].toUpperCase());
        return newName;
    };
    const handleSubmit = async () => {
        console.log('data', inputValue);
        let { result, message } = validateInput();
        if (result) {
            const myForm = new FormData();
            myForm.append('TenSP', normalizeName(inputValue.TenSP));
            myForm.append('Loai', normalizeName(inputValue.Loai));
            myForm.append('DonGia', inputValue.DonGia);
            myForm.append('GioiTinh', inputValue.GioiTinh);
            myForm.append('KhuyenMai', inputValue.KhuyenMai);
            myForm.append('product', inputValue.Anh);
            const res = await addProduct(myForm);
            const reponse = await res.json();
            // console.log('reponse', reponse);
            if (reponse.status !== 'OK') {
                setAlert({
                    show: true,
                    type: 'error',
                    message: reponse?.message,
                });
                return;
            } else {
                const newData = await getData();
                await props.setData(newData);
                props.setShow(false);
                setInputValue({
                    TenSP: '',
                    Loai: '',
                    DonGia: '',
                    GioiTinh: 2,
                    KhuyenMai: 0,
                    Anh: '',
                });
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Thêm sản phẩm thành công',
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
                    <h3>Thêm sản phẩm</h3>
                    <FontAwesomeIcon
                        className={style.icon}
                        icon={faClose}
                        onClick={props.handleToggleModalAdd}
                    />
                </div>
                <div className={style.modalContent}>
                    <div className={style.modalInput}>
                        <label>Tên sản phẩm:</label>
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
                        <label>Đối tượng:</label>
                        <div className={style.gender}>
                            {gender.map((item) => {
                                return (
                                    <div className={style.genderItem} key={item.id}>
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
                        <label>Đơn giá:</label>
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
                        <label>Khuyến mãi (%):</label>
                        <input
                            type="number"
                            value={inputValue.KhuyenMai}
                            onChange={(event) => {
                                setInputValue({ ...inputValue, KhuyenMai: event.target.value });
                            }}
                            placeholder="Nhập khuyến mãi ..."
                        ></input>
                    </div>

                    <div className={style.modalInput} id={style.select}>
                        <label>Loại sản phẩm:</label>
                        <select onChange={handleTypeChange} className={style.selectTypes}>
                            <option value="">Chọn loại sản phẩm</option>
                            {props.productTypes.map((type) => (
                                <option key={type} value={type} className={style.option}>
                                    {type}
                                </option>
                            ))}
                            <option value="Thêm loại">Thêm loại</option>
                        </select>
                    </div>
                    {selectedType === 'Thêm loại' && (
                        <div className={style.modalInput}>
                            <input
                                type="text"
                                value={inputValue.Loai}
                                onChange={(event) => {
                                    setInputValue({ ...inputValue, Loai: event.target.value });
                                }}
                                placeholder="Nhập loại sản phẩm ..."
                            ></input>
                        </div>
                    )}
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
                                <FontAwesomeIcon icon={faImage} className={style.noIMG} />
                            )}
                        </div>
                    </div>
                    <div className={style.modalBtn}>
                        <button onClick={handleSubmit}>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalAddProduct;
