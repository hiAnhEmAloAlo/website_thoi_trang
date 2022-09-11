import {
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './style.module.scss';
const Alert = ({ alert, setAlert }) => {
    const { type = '', message = '' } = alert;
    setTimeout(() => {
        setAlert({ ...alert, show: false });
    }, 1500);
    return (
        <div
            className={style.wrapperAlert}
            id={
                type === 'warning'
                    ? style.alertWaring
                    : type === 'error'
                    ? style.alertError
                    : style.alertSucces
            }
        >
            {type === 'warning' ? (
                <FontAwesomeIcon icon={faCircleExclamation} className={style.icon} />
            ) : type === 'error' ? (
                <FontAwesomeIcon icon={faCircleXmark} className={style.icon} />
            ) : (
                <FontAwesomeIcon icon={faCircleCheck} className={style.icon} />
            )}
            <p>{message}</p>
            <span onClick={() => setAlert({ ...alert, show: false })}>
                <FontAwesomeIcon icon={faClose} />
            </span>
        </div>
    );
};

export default Alert;
