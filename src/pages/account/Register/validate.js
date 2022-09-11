import { validator } from '~/ultis';
export default function validate(inputValue) {
    if (
        !inputValue.HoTen ||
        !inputValue.SDT ||
        !inputValue.DiaChi ||
        !inputValue.Email ||
        !inputValue.TenTaiKhoan ||
        !inputValue.MatKhau ||
        !inputValue.NhapLaiMatKhau
    ) {
        return {
            result: false,
            message: 'Không được để trống thông tin',
        };
    }
    if (!validator.name(inputValue.HoTen)) {
        return {
            result: false,
            message: 'Họ tên không chứa kí tự đặc biệt ',
        };
    }
    if (!validator.phone(inputValue.SDT)) {
        return {
            result: false,
            message: 'Số điện thoại không hợp lệ',
        };
    }
    if (!validator.email(inputValue.Email)) {
        return {
            result: false,
            message: 'Email không hợp lệ',
        };
    }
    if (!validator.username(inputValue.TenTaiKhoan)) {
        return {
            result: false,
            message: 'Tên tài khoản không hợp lệ ',
        };
    }
    if (inputValue.MatKhau !== inputValue.NhapLaiMatKhau) {
        return {
            result: false,
            message: 'Mật khẩu không trùng khớp',
        };
    }
    return {
        result: true,
    };
}
