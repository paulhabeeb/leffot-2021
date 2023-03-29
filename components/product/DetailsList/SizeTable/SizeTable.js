import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import { ToggleSection } from '@components/common'
import styles from './SizeTable.module.scss'

function parseSizeData(data) {
    return JSON.parse(asText(data))
}

function SizeRow({ columnLabels, hasRowLabels, size }) {
    return (
        <tr>
            {hasRowLabels && <th>{size._label}</th>}
            {columnLabels.map((column, index) => (
                <td key={index}>{size[column]}</td>
            ))}
        </tr>
    )
}

SizeRow.propTypes = {
    columnLabels: PropTypes.array,
    hasRowLabels: PropTypes.bool,
    size: PropTypes.object,
}

function SizeHead({ columnLabels, hasRowLabels }) {
    return (
        <thead>
            <tr>
                {hasRowLabels && <th></th>}
                {columnLabels.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    )
}

SizeHead.propTypes = {
    columnLabels: PropTypes.array,
    hasRowLabels: PropTypes.bool,
}

export default function SizeTable({ column_labels, has_row_labels, sizes }) {
    const columnHeaders = parseSizeData(column_labels)
    const sizeData = parseSizeData(sizes)

    return (
        <div className={styles.container}>
            <ToggleSection
                buttonId='size-guide-toggle'
                sectionId='size-guide'
                title='size guide'
            >
                <table>
                    <SizeHead
                        hasRowLabels={has_row_labels}
                        columnLabels={columnHeaders}
                    />
                    <tbody>
                        {sizeData.map((size, index) => (
                            <SizeRow
                                columnLabels={columnHeaders}
                                hasRowLabels={has_row_labels}
                                size={size}
                                key={index}
                            />
                        ))}
                    </tbody>
                </table>
            </ToggleSection>
        </div>
    )
}

SizeTable.propTypes = {
    column_labels: PropTypes.array,
    has_row_labels: PropTypes.bool,
    sizes: PropTypes.array,
}
