import PropTypes from 'prop-types'
import Description from '../Description'
import DetailItem from '../DetailItem'
import DetailsWrapper from '../DetailsWrapper'
import styles from './Watches.module.scss'

export default function Watches({ description, fields }) {
    return (
        <DetailsWrapper>
            {description && <Description description={description} />}
            <div className={styles.container}>
                {fields.watch_year && <DetailItem item={fields.watch_year} />}
                {fields.watch_case && <DetailItem item={fields.watch_case} />}
                {fields.watch_dial && <DetailItem item={fields.watch_dial} />}
                {fields.watch_reference && (
                    <DetailItem item={fields.watch_reference} />
                )}
                {fields.watch_dimensions && (
                    <DetailItem item={fields.watch_dimensions} />
                )}
                {fields.watch_crystal && (
                    <DetailItem item={fields.watch_crystal} />
                )}
                {fields.watch_movement && (
                    <DetailItem item={fields.watch_movement} />
                )}
                {fields.watch_strap && <DetailItem item={fields.watch_strap} />}
                {fields.watch_box_papers && (
                    <DetailItem item={fields.watch_box_papers} />
                )}
            </div>
        </DetailsWrapper>
    )
}

Watches.propTypes = {
    description: PropTypes.string,
    fields: PropTypes.object,
}
