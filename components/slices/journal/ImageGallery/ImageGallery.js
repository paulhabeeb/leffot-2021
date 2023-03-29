import PropTypes from 'prop-types'
import Slider from 'react-slick'

import JournalImage from '../Image'
import styles from './ImageGallery.module.scss'

export default function ImageGallery({ images }) {
    const settings = {
        adaptiveHeight: true,
        dots: true,
        infinite: true,
        speed: 200,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    arrows: false,
                },
            },
        ],
    }

    return (
        <div className={styles.container}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <JournalImage image={image.image} key={index} />
                ))}
            </Slider>
        </div>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
}
