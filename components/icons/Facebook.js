import PropTypes from 'prop-types'

export default function Facebook({ styles }) {
    return (
        <svg
            className={styles}
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d='M2.428 0.41c-0.936 0-1.695 0.753-1.695 1.682v27.112c0 0.929 0.759 1.682 1.695 1.682h14.709v-11.802h-4.002v-4.599h4.002v-3.392c0-3.936 2.423-6.080 5.961-6.080 1.695 0 3.152 0.125 3.576 0.181v4.114l-2.454 0.001c-1.924 0-2.297 0.907-2.297 2.239v2.937h4.59l-0.598 4.599h-3.992v11.802h7.826c0.936 0 1.695-0.753 1.695-1.682v-27.112c0-0.929-0.759-1.682-1.695-1.682h-27.321z' />
        </svg>
    )
}

Facebook.propTypes = {
    styles: PropTypes.string,
}
