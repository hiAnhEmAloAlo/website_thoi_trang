import { faC, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.scss';
export default function CancelFilter({ setFilterOptions, filterKey, title, setFilterValues }) {
    const cancelFilter = () => {
        setFilterValues((prev) => {
            return { ...prev, [filterKey]: null };
        });
        setFilterOptions((prev) => {
            return { ...prev, [filterKey]: null };
        });
    };
    return (
        <div className={style.wrapperCancel}>
            <span>{title}</span>
            <FontAwesomeIcon icon={faClose} className={style.icon} onClick={cancelFilter} />
        </div>
    );
}
