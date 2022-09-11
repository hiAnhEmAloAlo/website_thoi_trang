import validator from './validator';
const formatMoney = (n, currency) => {
    return (
        n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        }) + currency
    );
};
const formatDate = (init) => {
    var d = new Date(init);
    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var newDate = date + '/' + month + '/' + year;
    return newDate;
};
const orderStatusToText = (statusCode) => {
    switch (statusCode) {
        case 1:
            return 'Chờ xác nhận';
        case 2:
            return 'Đã xác nhận';
        case 3:
            return 'Đang giao hàng';
        case 4:
            return 'Thành công';
        case 5:
            return 'Hủy';
        case 6:
            return 'Đơn hoàn';
        default:
            return '';
    }
};
function removeAccents(str) {
    var AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

export { removeAccents, formatMoney, orderStatusToText, validator, formatDate };
