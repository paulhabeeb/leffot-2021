import { useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Fieldset } from '@leffot/form-controls'

import BlockTitle from './BlockTitle'
import styles from './FilterBlock.module.scss'

export default function FilterBlock({
    blockTitle,
    children,
    initialValues,
    startCollapsed,
    validationSchema,
}) {
    const [height, setHeight] = useState(startCollapsed ? 0 : 'auto')

    const onTitleClick = () => {
        setHeight(height === 0 ? 'auto' : 0)
    }

    return (
        <div className={styles.block}>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
            >
                {() => (
                    <Form>
                        <Fieldset>
                            <BlockTitle
                                blockTitle={blockTitle}
                                height={height}
                                onClick={onTitleClick}
                            />
                            <AnimateHeight duration={500} height={height}>
                                {children}
                            </AnimateHeight>
                        </Fieldset>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

FilterBlock.defaultProps = {
    getMoreFilters: () => undefined,
    startCollapsed: false,
}

FilterBlock.propTypes = {
    blockTitle: PropTypes.string,
    children: PropTypes.node,
    initialValues: PropTypes.object,
    startCollapsed: PropTypes.bool,
    validationSchema: PropTypes.object,
}
