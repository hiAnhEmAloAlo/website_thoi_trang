import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
const SelectOptions = ({ options, defaultTitle, setFitlterValues, filterKey }) => {
    const [valueSelected, setValueSelected] = useState();
    const [open, setOpen] = useState(true);
    useEffect(() => {
        if (valueSelected)
            setFitlterValues((prev) => {
                return { ...prev, [filterKey]: valueSelected.id };
            });
    }, [valueSelected]);
    return (
        <div className={style.wapperSelected}>
            <div className={style.select}>
                <input type="checkbox" checked={!open} onChange={() => setOpen(true)} />
                <span onClick={() => setOpen(true)}> {valueSelected?.title ?? defaultTitle}</span>
                <div className={style.wapperOptions}>
                    {open &&
                        options.map((option) => (
                            <div
                                className={style.option}
                                key={option.id}
                                onClick={() => {
                                    setOpen(false);
                                    setValueSelected({ ...option });
                                }}
                            >
                                {option.title}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SelectOptions;
