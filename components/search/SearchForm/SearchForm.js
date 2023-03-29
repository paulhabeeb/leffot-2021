import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import cn from 'classnames'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormRow, TextInput } from '@leffot/form-controls'

import { Button } from '@components/forms/actions'
import styles from './SearchForm.module.scss'

export default function SearchForm({
    hideMenu,
    inputName,
    margin,
    prefill,
    style,
}) {
    const router = useRouter()

    const initialValues = { [inputName]: prefill }
    const validationSchema = Yup.object({
        [inputName]: Yup.string(),
    })
    const handleSubmit = values => {
        document.body.click()
        hideMenu()
        const query = slugify(values[inputName].replace('&', ''), {
            remove: /[*+~.()'"!:@&]/g,
            replacement: '+',
        })

        const destination = `/search?q=${query}`
        router.push(destination)
    }

    const formStyles = cn(styles.form, {
        [styles.isNarrow]: style === 'narrow',
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className={formStyles}>
                    <FormRow margin={margin}>
                        <TextInput
                            hideLabel={true}
                            id={inputName}
                            label='Search'
                            name={inputName}
                            placeholder='Search our site...'
                        />
                    </FormRow>
                    <div>
                        <Button caption='Search' className={styles.button} />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

SearchForm.defaultProps = {
    hideMenu: () => null,
    inputName: 'search_query_adv',
    prefill: '',
    style: 'narrow',
}

SearchForm.propTypes = {
    hideMenu: PropTypes.func,
    inputName: PropTypes.string,
    margin: PropTypes.string,
    prefill: PropTypes.string,
    style: PropTypes.string,
}
