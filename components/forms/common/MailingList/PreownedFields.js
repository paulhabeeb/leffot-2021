import { useFormikContext } from 'formik'
import { Checkbox, FormRow } from '@leffot/form-controls'

import { ErrorMessage } from '@components/common'
import styles from './PreownedFields.module.scss'

export default function PreownedFields() {
    const { errors, touched } = useFormikContext()
    const hasSizeErrors = errors?.interests && touched?.interests

    const powSizes = {
        'interests.78171ee518': '5',
        'interests.6c7fb58d5e': '5\u2009\u00bd',
        'interests.42ba7b05b1': '6',
        'interests.be83496090': '6\u2009\u00bd',
        'interests.04974777a2': '7',
        'interests.8351feff88': '7\u2009\u00bd',
        'interests.f995d03157': '8',
        'interests.6c315de5fb': '8\u2009\u00bd',
        'interests.ce0f136706': '9',
        'interests.c7c2a1d553': '9\u2009\u00bd',
        'interests.abfeee5b34': '10',
        'interests.77748a26d7': '10\u2009\u00bd',
        'interests.f89cf003ac': '11',
        'interests.e10cb257e3': '11\u2009\u00bd',
        'interests.5082da5b5f': '12',
        'interests.57d0fe2ac1': '12\u2009\u00bd',
        'interests.03682edc6e': '13',
    }

    const fields = Object.entries(powSizes).map(([key, value]) => (
        <Checkbox name={key} key={key} style='rectangle'>
            {value}
        </Checkbox>
    ))

    return (
        <>
            <FormRow>
                <h2 className={styles.label}>US sizes</h2>
                <p className={styles.caption}>
                    Select as many as you like. We’ll send notifications for
                    each.
                </p>
                <ul className={styles.sizeGrid}>{fields}</ul>
                {hasSizeErrors && (
                    <ErrorMessage
                        className={styles.errors}
                        message='Please select at least one size.'
                    />
                )}
            </FormRow>
            <FormRow>
                <h2 className={styles.label}>Other newsletters</h2>
                <div>
                    <Checkbox name='interests.10947e23e6'>
                        I would like to receive other emails from Leffot
                        regarding new products, sales, pre-orders, and other
                        offers.
                    </Checkbox>
                </div>
            </FormRow>
        </>
    )
}
