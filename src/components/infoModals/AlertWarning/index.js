import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';
function AlertWarning({ setDeleting, selectedProductId, handleDelete }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);
    return (
        <div className={style.comfirmWrapper}>
            <div className={style.cofirmOverlay}></div>
            <div className={style.confirmContainer}>
                <div className={style.comfirmHeader}>
                    <h3>Cảnh báo</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        id={style.icon}
                        onClick={() => {
                            setDeleting(false);
                        }}
                    />
                </div>
                <div className={style.comfirmContent}>
                    <p>Bạn có chắc chắn xóa ?</p>
                </div>
                <div className={style.comfirmBtn}>
                    <button
                        onClick={() => {
                            setDeleting(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            await handleDelete(selectedProductId);
                            setDeleting(false);
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertWarning;
