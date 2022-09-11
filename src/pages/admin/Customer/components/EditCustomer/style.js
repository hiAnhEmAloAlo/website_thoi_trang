import styled from 'styled-components';
export const LoginRegisterWrapper = styled.div`
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    :root {
        --white-color: #fff;
        --black-color: #000;
        --text-color: #333;
        --border-color: #dddfe2;
        --box-shadow: rgba(255, 255, 255, 0.5);
        --primary-color: #f1c40f;
        --btn-color: rgb(38, 158, 255);
    }
    .layer-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.4);
    }
    a {
        color: #166fe5;
    }
    .switch__modal {
        color: blue;
        cursor: pointer;
        text-align: right;
    }
    .switch__modal:hover {
        text-decoration: underline;
    }
    .form__footer {
        text-align: right;
    }
    .input__container {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border-color);
        height: 100%;
        align-items: center;
        padding-right: 10px;
        position: relative;
    }
    .input__container input {
        outline: none;
    }

    .eye {
        cursor: pointer;
    }

    .wrapper__form {
        width: 40%;
        height: auto;
        top: 50%;
        left: 50%;
        box-shadow: 0 0 10 var(--box-shadow);
        transform: translate(-50%, -50%);
        background-color: var(--white-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 3;
    }
    .head__form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2rem;
    }
    .head__form .img__logo {
        width: 10rem;
        height: 10rem;
        box-shadow: 0 0 2rem var(--border-color);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        margin: 1.5rem 0;
    }
    .head__form .img__logo img {
        display: block;
        object-fit: cover;
        width: 90%;
        height: 41%;
    }
    .head__form span {
        font-size: 3rem;
        text-shadow: 0 0 1rem var(--border-color);
    }
    .error__message {
        color: #e74c3c;
        width: 100%;
        padding: 1rem;
        height: auto;
        min-height: 3.5rem;
        background-color: #ffebe9;
        max-width: 30%;
        border: 1px solid #e74c3c;
        font-size: 1.2rem;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        -moz-border-radius: 0.5rem;
        -ms-border-radius: 0.5rem;
        -o-border-radius: 0.5rem;
    }
    .form__content {
        padding: 1rem 2.5rem;
        width: 100%;
        height: 100%;
    }
    .form__login:hover {
        box-shadow: 0 0 2rem var(--border-color);
    }

    .form__content #btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form__content .btn {
        background-color: #2da44e;
        max-width: 30%;
        height: 3rem;
        font-size: 1.6rem;
        color: var(--white-color);
    }

    .content__form--group {
        width: 100%;
        height: 40px;
        margin-top: 1.5rem;
        font-size: 1.4rem;
        border: 0.6rem;
        /* display: flex;
        justify-content: center; */
    }

    .content__form--group .btn {
        height: 100%;
        color: var(--white-color);
        padding: 1rem 0;
        font-size: 2rem;
        background-color: #34e7e4;
        width: 100%;
    }
    .content__form--group input::placeholder {
        font-size: 1.6rem;
        padding: 0.5rem 0;
    }
    #btn-submit {
        color: white;
        background-color: #1877f2;
    }
    #btn-submit:hover {
        background-color: #166fe5;
    }
    .content__form--input {
        border: 1px solid #dddfe2;
        color: #1d2129;
        box-shadow: 0 0 1rem var(--white-color-color);
        width: 100%;
        outline: none;
        /* border: 1px solid; */
        height: 100%;
        border-radius: 6px;
        font-size: 1.6rem;
        padding: 0 10px;
    }
    .btn__modal {
        width: 100%;
        height: 2.5rem;
        border-radius: 20px;
        background-color: var(--btn-color);
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        -ms-border-radius: 20px;
        -o-border-radius: 20px;
    }
    .btn {
        border: none;
        font-size: 1.05rem;
        outline: none;
        border-radius: 0.5rem;
        padding: 2rem 1.4rem;
        -webkit-border-radius: 0.5rem;
        -moz-border-radius: 0.5rem;
        -ms-border-radius: 0.5rem;
        -o-border-radius: 0.5rem;
        box-shadow: 0 0 1rem var(--black-color);
    }
    .content__form--input:focus {
        border-color: #289647;
        box-shadow: 0 0 1rem var(--black-color);
        border: 1px solid var(--addBtn);
    }

    .wrapper__form {
        box-shadow: 0 0 0.5rem var(--border-color);

        width: 40%;
        border-radius: 1rem;
        -webkit-border-radius: 1rem;
        -moz-border-radius: 1rem;
        -ms-border-radius: 1rem;
        -o-border-radius: 1rem;
        background-color: #fff;
    }

    .content__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .content__header--heading {
        font-size: 1.6rem;
        color: var(--text-color);
    }

    .close {
        cursor: pointer;
        font-size: 1.6rem;
    }
`;
