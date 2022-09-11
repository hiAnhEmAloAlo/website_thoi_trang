const AddApi = (link, data) => {
    var Option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`http://localhost:3100/api/${link}`, Option);
};
const userApi = (endPoint, data) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`http://localhost:3100/api/user/${endPoint}`, options);
};
const getData = async () => {
    const res = await fetch(`http://localhost:3100/api/product`);
    const reponse = await res.json();
    return reponse;
};
const deleteApi = (link, id) => {
    const Option = {
        method: 'DELETE',
    };
    return fetch(`http://localhost:3100/api/${link}/${id}`, Option);
};
const updateApi = (link, id, data) => {
    var Option = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`http://localhost:3100/api/${link}/${id}`, Option);
};
const addProduct = (FormData) => {
    var Option = {
        method: 'POST',
        body: FormData,
    };
    return fetch(`http://localhost:3100/api/product`, Option);
};
const addOrder = (data) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3100/api/order', options);
};
const getInvoice = async () => {
    const res = await fetch(`http://localhost:3100/api/order`);
    const reponse = await res.json();
    return reponse;
};
const getUsers = async () => {
    const res = await fetch(`http://localhost:3100/api/user`);
    const reponse = await res.json();
    return reponse;
};

export {
    getData,
    AddApi,
    deleteApi,
    updateApi,
    addProduct,
    userApi,
    addOrder,
    getInvoice,
    getUsers,
};
