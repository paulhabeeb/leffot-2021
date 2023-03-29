import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { useProductContext } from '@components/product'

import MainImage from './MainImage'
import MainVideo from './MainVideo'
import PlaceholderImage from './PlaceholderImage'
import styles from './MainImageSlider.module.scss'

export default function MainImageSlider({
    asNavFor,
    images,
    mainSlider,
    videos,
}) {
    const { defaultImage } = useProductContext()
    if (images.length > 0) {
        const settings = {
            adaptiveHeight: false,
            centerMode: false,
            dots: true,
            // lazyLoad: true,
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
            appendDots: dots => (
                <div>
                    <ul>{dots}</ul>
                </div>
            ),
        }

        const imgs = []
        images.forEach((image, index) => {
            if (index === 0 && defaultImage) {
                imgs.push(<MainImage {...defaultImage} key={index} />)
            } else {
                imgs.push(<MainImage {...image} key={index} />)
            }
        })

        if (videos && videos.list) {
            videos.list.forEach((video, index) => {
                imgs.push(<MainVideo video={video} key={index} />)
            })
        }

        return (
            <div className={styles.container}>
                <Slider asNavFor={asNavFor} ref={mainSlider} {...settings}>
                    {imgs}
                </Slider>
            </div>
        )
    }

    return <PlaceholderImage />
}

MainImageSlider.propTypes = {
    asNavFor: PropTypes.object,
    images: PropTypes.array,
    mainSlider: PropTypes.object,
    videos: PropTypes.array,
}
