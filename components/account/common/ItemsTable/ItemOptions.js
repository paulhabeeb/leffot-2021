import { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './ItemOptions.module.scss'

export default function ItemOptions({ extraOptions, options }) {
    return (
        <dl className={styles.container}>
            {options &&
                options.map((option, index) => {
                    const { display_name_customer, display_value_customer } =
                        option

                    return (
                        <Fragment key={index}>
                            <dt className={styles.title}>
                                {display_name_customer}
                            </dt>
                            <dd className={styles.caption}>
                                {display_value_customer}
                            </dd>
                        </Fragment>
                    )
                })}
            {extraOptions &&
                extraOptions.map((option, index) => (
                    <Fragment key={index}>
                        <dt className={cn(styles.title, styles.extraOptions)}>
                            {option.title}
                        </dt>
                        <dd className={cn(styles.caption, styles.extraOptions)}>
                            {option.caption}
                        </dd>
                    </Fragment>
                ))}
        </dl>
    )
}

ItemOptions.propTypes = {
    options: PropTypes.array,
    extraOptions: PropTypes.array,
}
