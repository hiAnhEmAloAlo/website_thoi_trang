import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilterCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { removeAccents } from '~/ultis';
import { useNavigate } from 'react-router-dom';
function CustomerSearchBar({ data }) {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const [showSuggest, setShowSuggest] = useState(false);
    const suggestData = data?.filter((item) => {
        const findName = removeAccents(inputValue).toLowerCase();
        const typeName = removeAccents(item).toLowerCase();
        return typeName.includes(findName);
    });

    return (
        <div className={style.wrapperSearchBar}>
            <div className={style.searchBar}>
                <input
                    onChange={(e) => {
                        setShowSuggest(e.target.value !== '');
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setShowSuggest(false);
                            setInputValue('');
                            navigate(`/search/${removeAccents(inputValue.replaceAll(' ', '-'))}`);
                        }
                    }}
                    value={inputValue}
                    placeholder="Nhập tên/loại sản phẩm ..."
                />
                {inputValue && (
                    <button
                        className={style.clearBtn}
                        onClick={() => {
                            setInputValue('');
                            setShowSuggest(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                )}
                <button
                    className={style.findBtn}
                    onClick={() => {
                        setShowSuggest(false);
                        setInputValue('');
                        navigate(`/search/${removeAccents(inputValue.replaceAll(' ', '-'))}`);
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            {showSuggest && suggestData.length > 0 && (
                <div className={style.suggest}>
                    {suggestData?.map((item) => {
                        return (
                            <div
                                className={style.suggestItem}
                                key={item}
                                onClick={() => {
                                    // setFilterValue(item.TenSP);
                                    setInputValue('');
                                    setShowSuggest(false);
                                    navigate(`/search/${removeAccents(item.replaceAll(' ', '-'))}`);
                                }}
                            >
                                <span>{item}</span>
                            </div>
                        );
                    })}
                    {/* {suggestData.length === 0 && <span>Không tìm thấy kết quả</span>} */}
                </div>
            )}
        </div>
    );
}

export default CustomerSearchBar;
