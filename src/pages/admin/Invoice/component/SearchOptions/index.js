import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import style from './style.module.scss';
import SelectOptions from '~/components/SelectOptions';
import { orderStatusToText } from '~/ultis';
import CancelFilter from '../CancelFilter';

const SearchOptions = ({ setFilterOptions, filterOptions }) => {
    const [filterValues, setFitlterValues] = useState({
        Nam: '',
        Thang: '',
        TinhTrang: '',
        Text: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    // const lastInputRef = useRef();
    const handleInputChange = (e) => {
        setFitlterValues({ ...filterValues, Text: e.target.value });
    };
    const arrMonth = [
        { id: 1, title: 'Tháng 1' },
        { id: 2, title: 'Tháng 2' },
        { id: 3, title: 'Tháng 3' },
        { id: 4, title: 'Tháng 4' },
        { id: 5, title: 'Tháng 5' },
        { id: 6, title: 'Tháng 6' },
        { id: 7, title: 'Tháng 7' },
        { id: 8, title: 'Tháng 8' },
        { id: 9, title: 'Tháng 9' },
        { id: 10, title: 'Tháng 10' },
        { id: 11, title: 'Tháng 11' },
        { id: 12, title: 'Tháng 12' },
    ];
    const orderStatus = [
        { id: 1, title: 'Chờ xác nhận' },
        { id: 2, title: 'Đã xác nhận' },
        { id: 3, title: 'Đang giao hàng' },
        { id: 4, title: 'Thành công' },
        { id: 5, title: 'Hủy' },
        { id: 6, title: 'Hoàn đơn' },
    ];
    const arrYear = (() => {
        const now = new Date(Date.now());
        const year = now.getFullYear();
        const result = [];
        for (let i = year - 4; i <= year; i++) {
            result.push({
                id: i,
                title: `Năm ${i}`,
            });
        }
        return result;
    })();
    return (
        <div className={style.wrapperSearchOptions}>
            <div className={style.containerSearch}>
                <span>
                    <input
                        type="number"
                        placeholder="Nhập mã đơn hàng hoặc SĐT"
                        value={filterValues.Text}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === '.' || e.key === '+' || e.key === '-  ')
                                e.preventDefault();
                            if (e.key === 'Enter') {
                                setFitlterValues({ ...filterValues, Text: '' });
                                setFilterOptions({ ...filterValues });
                            }
                        }}
                    />
                </span>
                <span className={style.findGlass}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
            </div>
            <div className={style.containerOptions}>
                <span className={style.titleFiter} onClick={() => setIsOpen(!isOpen)}>
                    Lọc
                </span>

                {isOpen && (
                    <div className={style.contentFilter}>
                        <div
                            className={style.filterItem}
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <h3>Lọc theo</h3>
                            <span className={style.icon}>
                                <FontAwesomeIcon icon={faClose} onClick={() => setIsOpen(false)} />
                            </span>
                        </div>
                        <div className={style.filterItem}>
                            <SelectOptions
                                defaultTitle="Năm"
                                options={arrYear}
                                setFitlterValues={setFitlterValues}
                                filterKey="Nam"
                            />
                        </div>
                        <div className={style.filterItem}>
                            <SelectOptions
                                defaultTitle="Tháng"
                                options={arrMonth}
                                setFitlterValues={setFitlterValues}
                                filterKey="Thang"
                            />
                        </div>
                        <div className={style.filterItem}>
                            <SelectOptions
                                defaultTitle="Tình trạng"
                                options={orderStatus}
                                setFitlterValues={setFitlterValues}
                                filterKey="TinhTrang"
                            />
                        </div>
                        <div className={style.filterItem}>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setFilterOptions({
                                        ...filterValues,
                                    });
                                }}
                            >
                                Lọc
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* {(filterOptions?.Nam || filterOptions?.Thang || filterOptions?.TinhTrang) && (
                <div>
                    <button
                        className={style.noFilter}
                        onClick={() => {
                            setIsOpen(false);
                            setFitlterValues({
                                TinhTrang: '',
                                Nam: '',
                                Thang: '',
                            });
                            setFilterOptions({
                                TinhTrang: '',
                                Nam: '',
                                Thang: '',
                            });
                        }}
                    >
                        Bỏ lọc
                    </button>
                </div>
            )} */}
            {(filterOptions?.Nam ||
                filterOptions?.Thang ||
                filterOptions?.TinhTrang ||
                filterOptions?.Text) && (
                <div className={style.cancelFilter}>
                    {filterOptions.Text && (
                        <CancelFilter
                            filterKey="Text"
                            title={`Mã ĐH / SĐT: ${filterOptions.Text}`}
                            setFilterOptions={setFilterOptions}
                            setFilterValues={setFitlterValues}
                        />
                    )}
                    {filterOptions.Nam && (
                        <CancelFilter
                            filterKey="Nam"
                            title={`Năm: ${filterOptions.Nam}`}
                            setFilterOptions={setFilterOptions}
                            setFilterValues={setFitlterValues}
                        />
                    )}
                    {filterOptions.Thang && (
                        <CancelFilter
                            filterKey="Thang"
                            title={`Tháng: ${filterOptions.Thang}`}
                            setFilterOptions={setFilterOptions}
                            setFilterValues={setFitlterValues}
                        />
                    )}
                    {filterOptions.TinhTrang && (
                        <CancelFilter
                            filterKey="TinhTrang"
                            title={`Tình trạng: ${orderStatusToText(
                                parseInt(filterOptions.TinhTrang),
                            )}`}
                            setFilterOptions={setFilterOptions}
                            setFilterValues={setFitlterValues}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchOptions;
