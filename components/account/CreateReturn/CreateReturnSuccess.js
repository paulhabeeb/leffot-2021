import PropTypes from 'prop-types'
import fileDownload from 'js-file-download'

import BackToOrderLink from './BackToOrderLink'
import styles from './CreateReturnSuccess.module.scss'

export default function CreateReturnSuccess({ id, returnData }) {
    const downloadPDF = () =>
        fileDownload(returnData.labelBlob, 'leffot-shipping-label.pdf')

    const verbiage = returnData.labelRequested
        ? 'shipping label'
        : 'packing slip'

    return (
        <div className={styles.body}>
            <p>
                Your return has been submitted. You will receive an email
                {returnData.email && ` at ${returnData.email}`} confirming your
                return shortly. We will notify you when we receive the items.
            </p>
            <p>
                You can follow the status of your return by visiting the order
                page associated with the items you’re returning.
            </p>
            {returnData.labelRequested ? (
                <p>
                    Please download or print your shipping label below. It’s
                    also attached to your confirmation email. Items must be
                    shipped back to us within the next ten days.
                </p>
            ) : (
                <>
                    <p>
                        In your return shipment,{' '}
                        <strong>please include the packing slip below</strong>.
                        Ship your items back to us at:
                    </p>
                    <address className={styles.address}>
                        Leffot
                        <br />
                        10 Christopher St.
                        <br />
                        New York, NY 10014
                    </address>
                </>
            )}
            {returnData?.labelData && (
                <>
                    <button
                        className={styles.downloadLabel}
                        onClick={downloadPDF}
                    >
                        Download {verbiage}
                    </button>
                    <iframe
                        className={styles.iframe}
                        src={returnData.labelData}
                    />
                </>
            )}
            <BackToOrderLink id={id} />
        </div>
    )
}

CreateReturnSuccess.propTypes = {
    email: PropTypes.string,
    id: PropTypes.string,
    returnData: PropTypes.string,
}
