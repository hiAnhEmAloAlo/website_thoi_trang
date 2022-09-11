import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
const SliderIMG = ({ images }) => {
    const [currentIMG, setCurentIMG] = useState(0);
    let length = images.length;
    const handlePreIMG = () => {
        setCurentIMG(currentIMG === 0 ? length - 1 : currentIMG - 1);
    };
    const handleNextIMG = () => {
        setCurentIMG(currentIMG === images.length - 1 ? 0 : currentIMG + 1);
    };
    useEffect(() => {
        const isInterval = setInterval(() => {
            setCurentIMG(currentIMG === length - 1 ? 0 : currentIMG + 1);
        }, 6000);
        return () => clearInterval(isInterval);
    }, [currentIMG, length]);
    return images.map((image, index) => {
        if (index !== currentIMG) return null;
        else
            return (
                <div className={style.wrapperSlider} key={index}>
                    <span className={style.preBtn} onClick={handlePreIMG}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className={style.icon} />
                    </span>
                    <span className={style.nextBtn} onClick={handleNextIMG}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} className={style.icon} />
                    </span>
                    <div className={style.img}>
                        <img src={images[currentIMG]} alt="img" />
                    </div>
                </div>
            );
    });
};

export default SliderIMG;
