import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import style from './style.module.scss';
function BannerHome() {
    const { homeImage } = images;
    return (
        <div className={style.wrapperBanner}>
            <div className={style.img}>
                <img src={homeImage} alt="Home" />
                <div className={style.content}>
                    <h1>THIS IS ASOS</h1>
                    <p>ASOS DESIGN and 850+ brands</p>
                </div>
                <div className={style.description}>
                    <div className={style.descriptionContent}>
                        <FontAwesomeIcon icon={faCrown} id={style.icon} />
                        <div className={style.text}>
                            <h3>GIAO HÀNG CAO CẤP</h3>
                            <p>
                                Giao hàng trong ngày tiếp theo miễn phí không giới hạn trong cả năm
                                với giá 199k. Áp dụng Ts & C.
                            </p>
                        </div>
                    </div>
                    <div className={style.descriptionContent}>
                        <div className={style.text}>
                            <h3>SINH VIÊN ĐƯỢC GIẢM GIÁ 10%</h3>
                            <p>Nhận code của bạn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BannerHome;
