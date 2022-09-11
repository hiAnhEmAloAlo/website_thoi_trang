import { faFacebookSquare, faInstagram, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import images from '~/assets/customerImages';
import style from './style.module.scss';
function CustomerFooter() {
    // const [logo, { navFooter }] = images;
    return (
        <div className={style.wrapperFooter}>
            <div className={style.contact}>
                <div className={style.social}>
                    <span className={style.socialIcon}>
                        <FontAwesomeIcon id={style.iconFB} icon={faFacebookSquare} />
                    </span>
                    <span className={style.socialIcon}>
                        <FontAwesomeIcon id={style.iconInS} icon={faInstagram} />
                    </span>
                    <span className={style.socialIcon}>
                        <FontAwesomeIcon id={style.iconSnap} icon={faSnapchat} />
                    </span>
                </div>
                <div className={style.pay}>
                    {/* {navFooter.map((item) => {
                        return (
                            <div className={style.payImg} key={item}>
                                <img src={item} alt="pay" />
                            </div>
                        );
                    })} */}
                </div>
            </div>
            <div className={style.footerContent}>
                <div className={style.item}>
                    <h4>TRỢ GIÚP & THÔNG TIN</h4>
                    <ul>
                        <li className={style.list}>Trợ giúo</li>
                        <li className={style.list}>Theo dõi thứ tự</li>
                        <li className={style.list}>Giao hàng & Trả hàng</li>
                    </ul>
                </div>

                <div className={style.item}>
                    <h4>VỀ ASOS</h4>
                    <ul>
                        <li className={style.list}>Về chúng tôi</li>
                        <li className={style.list}>Việc làm tại ASOS</li>
                        <li className={style.list}>Cùng chịu trách nhiệm</li>
                        <li className={style.list}>Trang web của nhà đầu tư</li>
                    </ul>
                </div>

                <div className={style.item}>
                    <h4>THÊM TỪ ASOS</h4>
                    <ul>
                        <li className={style.list}>Ứng dụng di động</li>
                        <li className={style.list}>Thị trường của ASOS</li>
                        <li className={style.list}>Phiếu quà tặng</li>
                        <li className={style.list}>Black Friday</li>
                        <li className={style.list}>ASOS x Thrift+</li>
                    </ul>
                </div>

                <div className={style.item}>
                    <h4>SHOPPING FROM:</h4>
                    <ul>
                        <li className={style.list}>Bạn đang ở:</li>
                    </ul>
                </div>
            </div>
            <div className={style.theEnd}></div>
        </div>
    );
}
export default CustomerFooter;
