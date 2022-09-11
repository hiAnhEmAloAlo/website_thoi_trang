import { useState, useEffect } from 'react';

const getSavedValue = (key, initialValue) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) return data;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
};

export default function useLocalStorage(key, initialValue) {
    const [data, setData] = useState(() => getSavedValue(key, initialValue));
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data, key]);
    return [data, setData];
}
