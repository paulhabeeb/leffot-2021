import PropTypes from 'prop-types'

export default function TrashCan({ styles }) {
    return (
        <svg
            css={styles}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
        >
            <rect x='-192' width='185' height='99'></rect>
            <rect y='-36' width='100' height='30'></rect>
            <line x1='8' y1='-14.5' x2='18' y2='-14.5' className='a'></line>
            <line x1='-179' y1='16.5' x2='-162' y2='16.5' className='a'></line>
            <rect x='-170.8' y='31.3' width='8.7' height='8.6'></rect>
            <path d='M-164.5 42.3h4.7v-4.7h-4.7V42.3zM-159.3 42.7h-5.6V37.2h5.6V42.7L-159.3 42.7zM-166.2 44.1h8.3v-8.2h-8.3V44.1L-166.2 44.1zM-157.5 44.5h-9.2v-9.1h9.2V44.5L-157.5 44.5z'></path>
            <polygon points='-166.1 44.1 -166.3 44 -158 35.8 -157.9 35.9 '></polygon>
            <rect x='-179' y='58' width='35' height='32.5' className='b'></rect>
            <rect
                x='-136.5'
                y='58'
                width='35'
                height='32.5'
                className='b'
            ></rect>
            <rect x='-94' y='58' width='35' height='32.5' className='b'></rect>
            <rect x='-50' y='58' width='35' height='32.5' className='b'></rect>
            <rect x='-126.5' y='34.8' width='10.3' height='10.2'></rect>
            <rect x='-126.5' y='31.8' width='0.5' height='2.3'></rect>
            <rect x='-116.8' y='31.8' width='0.5' height='2.3'></rect>
            <rect x='-127' y='32.3' width='11.2' height='0.6'></rect>
            <rect x='-83.8' y='33.8' width='10.3' height='10.2'></rect>
            <rect x='-76.8' y='28.7' width='3.3' height='3.3'></rect>
            <rect
                x='-178.5'
                y='22.5'
                width='30'
                height='30'
                className='a'
            ></rect>
            <rect
                x='-136.5'
                y='22.5'
                width='30'
                height='30'
                className='a'
            ></rect>
            <rect
                x='-93.5'
                y='22.5'
                width='30'
                height='30'
                className='a'
            ></rect>
            <rect
                x='-49.5'
                y='22.5'
                width='30'
                height='30'
                className='a'
            ></rect>
            <rect x='31' y='40' width='7' height='44'></rect>
            <rect x='46' y='40' width='7' height='44'></rect>
            <rect x='62' y='40' width='7' height='44'></rect>
            <path d='M92 9H63V0H37v9H7v22h8v69h70V31h7V9zM78 93H22V32h56V93zM44 7h12v2H44V7zM85 24H14v-8h71V24z'></path>
        </svg>
    )
}

TrashCan.propTypes = {
    styles: PropTypes.object,
}
