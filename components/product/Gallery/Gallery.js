import { useEffect, useRef, useState } from 'react'

import { ErrorBoundary } from '@components/common'
import MainImageSlider from './MainImageSlider'
import styles from './Gallery.module.scss'

export default function Gallery(props) {
    const [mainSliderNav, setMainSliderNav] = useState() // eslint-disable-line no-unused-vars
    const [thumbSliderNav, setThumbSliderNav] = useState()
    const mainSlider = useRef(null)
    const thumbSlider = useRef(null)

    useEffect(() => {
        setMainSliderNav(mainSlider.current)
        setThumbSliderNav(thumbSlider.current)
    }, [])

    return (
        <section className={styles.container}>
            <ErrorBoundary>
                <MainImageSlider
                    asNavFor={thumbSliderNav}
                    mainSlider={mainSlider}
                    {...props}
                />
            </ErrorBoundary>
        </section>
    )
}
