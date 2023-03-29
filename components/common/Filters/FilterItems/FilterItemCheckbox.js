import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { Checkbox } from '@leffot/form-controls'

import FilterItemWrapper from './FilterItemWrapper'
import styles from './FilterItemCheckbox.module.scss'

export default function FilterItemCheckbox({
    count,
    id,
    name,
    onClick,
    selected,
    style,
    title,
}) {
    const { setFieldValue } = useFormikContext()

    const handleClick = () => {
        setFieldValue(name, !selected)
        onClick()
    }

    const showCount = !isNaN(count)

    return (
        <FilterItemWrapper>
            <Checkbox id={id} name={name} onClick={handleClick} style={style}>
                <span dangerouslySetInnerHTML={{ __html: title }} />
                {showCount && <span className={styles.count}>({count})</span>}
            </Checkbox>
        </FilterItemWrapper>
    )
}

FilterItemCheckbox.propTypes = {
    count: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    style: PropTypes.string,
    title: PropTypes.string,
}
