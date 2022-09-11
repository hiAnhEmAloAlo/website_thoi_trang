import style from './style.module.scss';
const Filter = ({ data, setFilterOptions, filterOptions }) => {
    return (
        <div className={style.wrapperFilter}>
            <div className={style.content}>
                <div>
                    <h4>Giới tính</h4>
                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={1 === filterOptions.gender}
                            onChange={(e) => setFilterOptions({ ...filterOptions, gender: 1 })}
                        />
                        <span>Nam</span>
                    </div>

                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={2 === filterOptions.gender}
                            onChange={(e) => setFilterOptions({ ...filterOptions, gender: 2 })}
                        />
                        <span>Nữ</span>
                    </div>
                </div>

                <div>
                    <h4>Loại sản phẩm</h4>
                    {data?.map((productType) => {
                        return (
                            <div key={productType} className={style.itemFilter}>
                                <input
                                    type="checkbox"
                                    value={productType}
                                    checked={filterOptions.type === productType}
                                    onChange={(e) => {
                                        setFilterOptions({
                                            ...filterOptions,
                                            type: e.target.value,
                                        });
                                    }}
                                />
                                <span>{productType}</span>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h4>Lọc theo giá</h4>
                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={'increase' === filterOptions.price}
                            onChange={(e) =>
                                setFilterOptions({ ...filterOptions, price: 'increase' })
                            }
                        />
                        <span>Tăng dần</span>
                    </div>

                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={'reduce' === filterOptions.price}
                            onChange={(e) =>
                                setFilterOptions({ ...filterOptions, price: 'reduce' })
                            }
                        />
                        <span>Giảm dần</span>
                    </div>

                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={100000 === filterOptions.price}
                            onChange={(e) => setFilterOptions({ ...filterOptions, price: 100000 })}
                        />
                        <span>Dưới 100.000 đ</span>
                    </div>

                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={500000 === filterOptions.price}
                            onChange={(e) => setFilterOptions({ ...filterOptions, price: 500000 })}
                        />
                        <span>Dưới 500.000 đ</span>
                    </div>

                    <div className={style.itemFilter}>
                        <input
                            type="checkbox"
                            checked={1000000 === filterOptions.price}
                            onChange={(e) => setFilterOptions({ ...filterOptions, price: 1000000 })}
                        />
                        <span>Dưới 1.000.000 đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
