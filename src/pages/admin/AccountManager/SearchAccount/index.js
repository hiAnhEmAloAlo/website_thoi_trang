import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilterCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchAccount({ setFilterValue, data, filterValue = '' }) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggest, setShowSuggest] = useState(false);
    const suggestData = data?.filter((item) => {
        // console.log(item);
        const itemEmail = item.Email.toLowerCase();
        const findEmail = inputValue.toLowerCase();
        return itemEmail.includes(findEmail);
    });
    useEffect(() => {
        setInputValue(filterValue);
    }, [filterValue]);
    return (
        <div className={style.wrapperSearchBar}>
            {filterValue && (
                <button
                    onClick={() => {
                        setInputValue('');
                        setFilterValue('');
                    }}
                    className={style.back}
                >
                    <FontAwesomeIcon icon={faFilterCircleXmark} /> Bỏ tìm kiếm
                </button>
            )}
            <div className={style.searchBar}>
                <input
                    onChange={(e) => {
                        setShowSuggest(e.target.value !== '');
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && suggestData.length > 0)
                            setFilterValue(e.target.value);
                        setShowSuggest(false);
                    }}
                    value={inputValue}
                    placeholder="Nhập email người dùng..."
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
                        if (suggestData.length > 0) setFilterValue(inputValue);
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            {showSuggest && (
                <div className={style.suggest}>
                    {suggestData.map((item) => {
                        return (
                            <div
                                className={style.suggestItem}
                                key={item.id}
                                onClick={() => {
                                    setFilterValue(item.Email);
                                    setInputValue(item.Email);
                                    setShowSuggest(!showSuggest);
                                }}
                            >
                                <span>{item.Email}</span>
                            </div>
                        );
                    })}
                    {suggestData.length === 0 && <span>Không tìm thấy kết quả</span>}
                </div>
            )}
        </div>
    );
}

export default SearchAccount;
