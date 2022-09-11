import React from 'react';
import style from './style.module.scss';
const FilterProducts = ({ types, setFilterOptions, filterOptions }) => {
    const filterPrice = [
        {
            id: '1',
            title: 'Dưới 100.000',
        },
        {
            id: '2',
            title: 'Từ 100.000 - 200.000',
        },
        {
            id: '3',
            title: 'Từ 200.000 - 500.000',
        },
        {
            id: '4',
            title: 'Trên 500.000',
        },
    ];
    const sortPrice = [
        {
            id: '1',
            title: 'Tăng dần',
        },
        {
            id: '2',
            title: 'Giảm dần',
        },
    ];
    return (
        <div className={style.wrapperFilter}>
            <h4>Loại sản phẩm</h4>
            {types?.map((item, index) => {
                return (
                    <div className={style.filterItem} key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item === filterOptions.Loai}
                                onChange={(e) => {
                                    if (filterOptions.Loai === e.target.value)
                                        setFilterOptions({ ...filterOptions, Loai: '' });
                                    else
                                        setFilterOptions({
                                            ...filterOptions,
                                            Loai: e.target.value,
                                        });
                                }}
                                value={item}
                            />
                            <span>{item}</span>
                        </label>
                    </div>
                );
            })}

            <h4>Mức giá</h4>
            {filterPrice.map((item, index) => {
                return (
                    <div className={style.filterItem} key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.id === filterOptions.Gia}
                                onChange={(e) => {
                                    if (filterOptions.Gia === e.target.value)
                                        setFilterOptions({ ...filterOptions, Gia: '' });
                                    else
                                        setFilterOptions({
                                            ...filterOptions,
                                            Gia: e.target.value,
                                        });
                                }}
                                value={item.id}
                            />
                            <span>{item.title}</span>
                        </label>
                    </div>
                );
            })}
            <h4>Sắp xếp</h4>
            {sortPrice.map((item, index) => {
                return (
                    <div className={style.filterItem} key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.id === filterOptions.Sort}
                                onChange={(e) => {
                                    if (filterOptions.Sort === e.target.value)
                                        setFilterOptions({ ...filterOptions, Sort: '' });
                                    else
                                        setFilterOptions({
                                            ...filterOptions,
                                            Sort: e.target.value,
                                        });
                                }}
                                value={item.id}
                            />
                            <span>{item.title}</span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
};

export default FilterProducts;
