import PropTypes from 'prop-types'
import Image from "next/legacy/image"
import Slider from 'react-slick'

import styles from './ExpandedGalleryCarousel.module.scss'

export default function ExpandedGalleryCarousel({ variant }) {
    const {
        primary: { main_image },
        items,
    } = variant

    const settings = {
        adaptiveHeight: false,
        centerMode: false,
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        variableWidth: true,
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
        <div className={styles.gallery}>
            <div className={styles.slick}>
                <Slider {...settings}>
                    <figure>
                        <div>
                            <Image
                                alt={main_image.alt}
                                height={main_image.dimensions.height}
                                src={main_image.url}
                                width={main_image.dimensions.width}
                            />
                        </div>
                    </figure>
                    {items.map((item, index) => (
                        <figure key={index}>
                            <div>
                                <Image
                                    alt={item.other_images.alt}
                                    height={item.other_images.dimensions.height}
                                    src={item.other_images.url}
                                    width={item.other_images.dimensions.width}
                                />
                            </div>
                        </figure>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

ExpandedGalleryCarousel.propTypes = {
    variant: PropTypes.object,
}
