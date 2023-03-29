import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { BigStep, BigStepList } from '@components/common'
import styles from './MailInGuide.module.scss'

function Gallery() {
    const settings = {
        adaptiveHeight: false,
        centerMode: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    variableWidth: true,
                },
            },
        ],
    }

    return (
        <div className={styles.gallery}>
            <Slider {...settings}>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/bc5f7d12-3a4e-4a8a-9b8f-39cf80367dd2_top-thumb.jpg?auto=compress,format'
                        alt='Top-down view of a pair of shoes.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/d3d41039-d0a5-4fb7-81a3-a6f8fbeecb27_soles-thumb.jpg?auto=compress,format'
                        alt='Both soles of a pair of shoes.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/5150de92-f715-4e87-baef-ec1c4167207b_vamp-and-toes-thumb.jpg?auto=compress,format'
                        alt='The vamp and toes of a pair of shoes.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/b7313a71-2da2-4b64-8f16-859084511f25_left-right-thumb.jpg?auto=compress,format'
                        alt='Two images. The first, a profile view of the left side of the shoe. The second, a profile view of the right side of the same shoe.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/28c7c3a9-ae18-4611-847c-080e39a5ee2e_heel-wear-thumb.jpg?auto=compress,format'
                        alt='The heels of a pair of shoes.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/6440f893-95f2-4ee0-97b8-6470aac71cf8_heels-thumb.jpg?auto=compress,format'
                        alt='The heel counter of a pair of shoes.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/4ed094e6-9198-4a6a-af0d-57631ecb1ca9_heel-inside-thumb.jpg?auto=compress,format'
                        alt='A top-down view of the shoe’s interior, showing the wear on the heel.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/9bdfea36-7201-4e4b-893c-b55523e603ac_knick-thumb.jpg?auto=compress,format'
                        alt='A close-up view of the right toe box, taken at a slight angle.'
                    />
                </div>
                <div>
                    <img
                        src='https://images.prismic.io/leffot/0ce80da2-67e4-441a-8133-5c4971e41986_size-thumb.jpg?auto=compress,format'
                        alt='The size written on the inside of the shoe.'
                    />
                </div>
            </Slider>
        </div>
    )
}

export default function MailInGuide({ steps }) {
    return (
        <BigStepList>
            {steps.map((step, index) => (
                <BigStep
                    title={step.steptitle}
                    caption={step.stepcaption}
                    key={index}
                >
                    {step.html.length > 0 && <Gallery />}
                </BigStep>
            ))}
        </BigStepList>
    )
}

MailInGuide.propTypes = {
    steps: PropTypes.array,
}
