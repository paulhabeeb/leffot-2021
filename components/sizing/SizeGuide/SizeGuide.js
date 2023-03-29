import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Formik } from 'formik'

import { BigStepList } from '@components/common'
import ConversionTable from '../ConversionTable'
import GuideStep from '../GuideStep'
import RadioList from '../RadioList'
import styles from './SizeGuide.module.scss'

export default function SizeGuide({ conversions, sizes, steps, widths }) {
    const [currentStep, setCurrentStep] = useState(0)

    const initialValues = {
        size: '',
        width: '',
    }

    const handleChange = () => {
        setCurrentStep(currentStep + 1)
    }

    return (
        <div className={styles.container}>
            <BigStepList>
                <Formik initialValues={initialValues}>
                    {() => (
                        <Form>
                            {steps.map((step, index) => {
                                let child = (
                                    <RadioList
                                        fieldsetId='size'
                                        handleChange={handleChange}
                                        radios={sizes}
                                    />
                                )

                                if (index === 1) {
                                    child = (
                                        <RadioList
                                            fieldsetId='width'
                                            handleChange={handleChange}
                                            radios={widths.US}
                                        />
                                    )
                                }

                                if (index === 2) {
                                    child = (
                                        <ConversionTable
                                            conversions={conversions}
                                            setCurrentStep={setCurrentStep}
                                            widths={widths}
                                        />
                                    )
                                }

                                return (
                                    <GuideStep
                                        caption={step.primary.step_caption}
                                        child={child}
                                        key={index}
                                        isActive={index === currentStep}
                                        isComplete={index < currentStep}
                                        title={step.primary.step_title}
                                    />
                                )
                            })}
                        </Form>
                    )}
                </Formik>
            </BigStepList>
        </div>
    )
}

SizeGuide.propTypes = {
    conversions: PropTypes.array,
    sizes: PropTypes.array,
    steps: PropTypes.array,
    widths: PropTypes.object,
}
