import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { email } from '@lib/data'

import { Button } from '@components/forms/actions'
import styles from './Button.module.scss'

function OutOfStock({ message, showWaitlistMessage }) {
    return (
        <div className={styles.preorderMessage}>
            <div className={styles.oosMessage}>{message || 'Sold out'}</div>
            {showWaitlistMessage && (
                <p className={styles.messageBelow}>
                    <a href={`mailto:${email.main}`}>Contact us</a> to join the
                    waitlist
                </p>
            )}
        </div>
    )
}

OutOfStock.propTypes = {
    message: PropTypes.string,
    showWaitlistMessage: PropTypes.bool,
}

function UpcomingPreorder({ launchDate }) {
    return (
        <div className={styles.preorderMessage}>
            <div className={styles.comingSoon}>Coming Soon</div>
            <p
                className={styles.messageBelow}
                dangerouslySetInnerHTML={{ __html: launchDate }}
            />
        </div>
    )
}

UpcomingPreorder.propTypes = {
    launchDate: PropTypes.string,
}

export default function AddToCartButton({
    fields,
    inventory,
    isAvailable,
    isPreorder,
    isPreorderAvailable,
    showWaitlistMessage,
}) {
    const { isSubmitting } = useFormikContext()

    if (
        isAvailable &&
        isPreorder &&
        inventory.isInStock &&
        !isPreorderAvailable
    ) {
        return <UpcomingPreorder launchDate={fields.pre_dateLaunch.value} />
    }

    if (isAvailable && inventory.isInStock) {
        return (
            <div>
                <Button
                    caption={isPreorder ? 'Pre-order' : 'Add to Cart'}
                    className={styles.button}
                    isSubmitting={isSubmitting}
                    loaderSize={19}
                />
            </div>
        )
    }

    return <OutOfStock showWaitlistMessage={showWaitlistMessage} />
}

AddToCartButton.propTypes = {
    fields: PropTypes.object,
    inventory: PropTypes.object,
    isAvailable: PropTypes.bool,
    isPreorder: PropTypes.bool,
    isPreorderAvailable: PropTypes.bool,
    showWaitlistMessage: PropTypes.bool,
}
