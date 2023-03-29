import cleanOptionName from '@lib/clean-option-name'
import toCamelCase from '@lib/to-camel-case'
import {
    beginWithAdd,
    beginWithHas,
    endWithChange,
    hasChange,
} from '@lib/regex'
import { upcharges } from '@lib/mto/upcharges'

const regexHasChange = RegExp(hasChange)
const regexBeginWithAdd = RegExp(beginWithAdd)
const regexBeginWithHas = RegExp(beginWithHas)
const regexEndWithChange = RegExp(endWithChange)

export const updateToePlates = ({ productOptions, selections }) => {
    const { sole, toePlates } = getNamesAndVals(productOptions)

    const soleTestFunc = (selectedLabel, validValues) =>
        validValues.some(arrVal => selectedLabel.includes(arrVal))
    const toePlatesTestFunc = (selectedLabel, validValues) =>
        !validValues.includes(selectedLabel)

    const { fluxIsSelected, updatedSelections, updatedOptions } =
        getEnabledOrDisabled({
            productOptions,
            newSelections: selections,
            controlOption: {
                ...sole,
                testFunc: soleTestFunc,
                validValues: ['Leather'],
            },
            fluxOption: {
                ...toePlates,
                testFunc: toePlatesTestFunc,
                validValues: ['None'],
                valueToKeepEnabled: 'None',
            },
        })

    return {
        platesAreSelected: fluxIsSelected,
        updatedProductOptions: updatedOptions,
        updatedSelections,
    }
}

const getLabelForSelectedId = (selectedName, selectedVals, values) => {
    const selectedId = values[selectedName]

    let selectedLabel = ''
    selectedVals.forEach(val => {
        if (Number(val.entityId) === Number(selectedId)) {
            selectedLabel = val.label
        }
    })

    return selectedLabel
}

export const getNamesAndVals = options => {
    let namesAndVals = {}

    options.forEach(option => {
        const attributeName = option.entityId.toString()
        const cleanedName = cleanOptionName(option.displayName.toLowerCase())
        let camelCaseName = toCamelCase(cleanedName)

        // If this option is in the format "has XYZ change"
        if (regexHasChange.test(cleanedName)) {
            const trimmedName = cleanedName
                .replace(regexBeginWithHas, '')
                .replace(regexEndWithChange, '')
            camelCaseName = toCamelCase(trimmedName)
        }

        // If this option begins with "Add"
        if (regexBeginWithAdd.test(cleanedName)) {
            const trimmedName = cleanedName.replace(regexBeginWithAdd, '')
            camelCaseName = toCamelCase(trimmedName)
        }

        if (option?.values) {
            namesAndVals = {
                ...namesAndVals,
                [camelCaseName]: {
                    ...namesAndVals[camelCaseName],
                    name: attributeName,
                    vals: option.values,
                },
            }
        }

        if (option?.value && option?.noValue) {
            namesAndVals = {
                ...namesAndVals,
                [camelCaseName]: {
                    ...namesAndVals[camelCaseName],
                    toggleName: attributeName,
                    toggleValOn: option.value,
                    toggleValOff: option.noValue,
                },
            }
        }
    })

    return namesAndVals
}

export const getHasSpecificOption = (name, options, isFuzzy = false) => {
    return options.some(option => {
        const formattedName = cleanOptionName(option.displayName)

        if (
            (isFuzzy && formattedName.includes(name)) ||
            (!isFuzzy && formattedName === name)
        ) {
            return true
        }

        return false
    })
}

const setEnabledDisabledValues = (
    option,
    shouldDisable,
    valueToKeepEnabled,
    productOptions,
    selections
) => {
    // Set the initial value to the already-selected value, in
    // case we want to keep it selected.
    let enabledValue = selections[option.name]

    // If we're disabling the option, then we don't need the
    // value anymore
    if (shouldDisable) {
        enabledValue = ''
    }

    // Loop through all the values (None, Sunken Metal, etc), get
    // the id of the one you want to keep, and set it to the new current val
    const newVals = []
    option.vals.forEach(val => {
        let disabled = false

        if (shouldDisable) {
            if (val.label !== valueToKeepEnabled) {
                disabled = true
            } else {
                // Some options, like Toe Plates, have a "None" option
                // that gets selected when the other options are disable.
                // Other options, like Toe Detail, only have one option,
                // and this enabledValue won't change from how we
                // initialized it up above.
                enabledValue = val.entityId.toString()
            }
        }

        newVals.push({
            ...val,
            disabled,
        })
    })

    const updatedProductOptions = []
    productOptions.forEach(productOption => {
        const newName = productOption.entityId.toString()
        if (newName === option.name) {
            updatedProductOptions.push({
                ...productOption,
                values: [...newVals],
            })
        } else {
            updatedProductOptions.push(productOption)
        }
    })

    return {
        enabledValue,
        updatedProductOptions,
    }
}

export const getEnabledOrDisabled = ({
    controlOption,
    fluxOption,
    newSelections,
    productOptions,
}) => {
    const selectedControlLabel = getLabelForSelectedId(
        controlOption.name,
        controlOption.vals,
        newSelections
    )
    const selectedFluxLabel = getLabelForSelectedId(
        fluxOption.name,
        fluxOption.vals,
        newSelections
    )

    // Set the initial values to the current ones so they won't change
    // if we're not disabling the toe detail section.
    let fluxIsSelected = false
    let fluxToggleVal = fluxOption.toggleValOff
    let shouldDisable = true

    if (
        controlOption.testFunc(selectedControlLabel, controlOption.validValues)
    ) {
        shouldDisable = false

        if (fluxOption.testFunc(selectedFluxLabel, fluxOption.validValues)) {
            fluxIsSelected = true
            fluxToggleVal = fluxOption.toggleValOn
        }
    }

    // Loop through all the plates options (None, Sunken Metal, etc), get
    // the id of None, and set it to the new current value
    const { enabledValue, updatedProductOptions } = setEnabledDisabledValues(
        fluxOption,
        shouldDisable,
        fluxOption.valueToKeepEnabled,
        productOptions,
        newSelections
    )

    const updatedSelections = {
        [fluxOption.name]: enabledValue,
    }
    if (fluxOption?.toggleName) {
        updatedSelections[fluxOption.toggleName] = fluxToggleVal
    }

    return {
        fluxIsSelected,
        updatedSelections,
        updatedOptions: updatedProductOptions,
    }
}

export const getInitCheckboxToggleState = toggles => {
    const state = {}

    toggles.forEach(toggle => {
        state[toggle.trimmedName] = toggle.checkedByDefault
    })

    return state
}

const getOptionToggle = (name, optionNames) => {
    let attributeName = null

    for (const key in optionNames) {
        if (optionNames[key].name.includes(`has ${name} change`)) {
            attributeName = key
        }
    }

    return attributeName
}

const getOptionNameAndValue = (name, values, optionNames) => {
    let attributeName = null
    let selectedAttributeValue = null

    for (const key in optionNames) {
        if (Object.prototype.hasOwnProperty.call(optionNames, key)) {
            if (name !== 'leather' && optionNames[key].name === name) {
                attributeName = key
                const valueKey = Number(values[attributeName])
                selectedAttributeValue = optionNames[key].values[valueKey]
            }
            if (
                name === 'leather' &&
                optionNames[key].name === 'leather color'
            ) {
                attributeName = key
                selectedAttributeValue = values[key]
            }
        }
    }

    return {
        attributeName,
        selectedAttributeValue,
    }
}

// Is the selected option among the defaults?
export const checkIfInDefaultOptions = (name, value, defaultOptions) => {
    if (defaultOptions[name] && defaultOptions[name].includes(value)) {
        return true
    }

    return false
}

const checkIfChangeOptionChecked = (name, optionNames, selectedValues) => {
    const selectedValue = selectedValues[name]
        ? optionNames[name].values.yes
        : optionNames[name].values.no

    if (selectedValue === optionNames[name].values.yes) {
        return true
    }

    return false
}

const sumUpcharges = toggles => {
    let totalUpcharge = 0

    for (const key in toggles) {
        if (
            toggles[key] &&
            key !== 'ultimate package' &&
            key !== 'black edition' &&
            key !== 'last' &&
            key !== 'toe detail'
        ) {
            totalUpcharge += upcharges.corthay[key]
        }
    }

    return totalUpcharge
}

const checkShouldToggleUltimatePackage = toggles => {
    const upcharge = sumUpcharges(toggles)

    if (
        upcharge > upcharges.corthay['ultimate package'] &&
        !toggles['ultimate package']
    ) {
        return true
    }
    if (
        upcharge < upcharges.corthay['ultimate package'] &&
        toggles['ultimate package']
    ) {
        return true
    }

    return false
}

const checkShouldToggleBlackEdition = (
    values,
    optionNames,
    blackEditionOptions,
    toggles
) => {
    let hasAllBlackEditionOptions = true

    for (const key in blackEditionOptions) {
        if (Object.prototype.hasOwnProperty.call(blackEditionOptions, key)) {
            const { selectedAttributeValue } = getOptionNameAndValue(
                key,
                values,
                optionNames
            )

            if (!blackEditionOptions[key].includes(selectedAttributeValue)) {
                hasAllBlackEditionOptions = false
                break
            }
        }
    }

    if (hasAllBlackEditionOptions && !toggles['black edition']) {
        return true
    }
    if (!hasAllBlackEditionOptions && toggles['black edition']) {
        return true
    }

    return false
}

export const getShouldUncheck = (
    trimmedName,
    toggleStates,
    shouldToggle,
    isInit
) => {
    if (isInit) {
        if (
            (shouldToggle.ultimatePackage &&
                trimmedName !== 'ultimate package') ||
            (shouldToggle.blackEdition && trimmedName !== 'black edition')
        ) {
            if (
                (trimmedName === 'toe plates' ||
                    trimmedName === 'last' ||
                    trimmedName === 'toe detail') &&
                toggleStates.current[trimmedName] === true &&
                toggleStates.next[trimmedName] === true
            ) {
                return false
            }

            // Most things other than toe plates or last should be disabled because we don't need
            // their individual upcharge because that's now covered by ultimate package
            return true
        }

        return false
    }

    // If black edition needs to be flipped, and the direction it needs to be flipped is on,
    // and if the toggle we're reviewing isn't black edition itself
    if (
        shouldToggle.blackEdition &&
        !toggleStates.current['black edition'] &&
        trimmedName !== 'black edition'
        // && trimmedName !== 'last' // You don't want to exclude last here because then it'll stay enabled
    ) {
        // If we're looking at toe plates and we haven't just disabled them
        if (
            (trimmedName === 'toe plates' ||
                trimmedName === 'last' ||
                trimmedName === 'toe detail') &&
            toggleStates.current[trimmedName] === true &&
            toggleStates.next[trimmedName] === true
        ) {
            return false
        }

        return true
    }

    // If black edition needs to be flipped, and the direction it needs to be flipped is off,
    // and if the toggle we're reviewing is black edition itself
    if (
        shouldToggle.blackEdition &&
        toggleStates.current['black edition'] &&
        trimmedName === 'black edition'
    ) {
        return true
    }

    if (
        shouldToggle.blackEdition &&
        toggleStates.current['black edition'] &&
        toggleStates.next[trimmedName] === false
    ) {
        return true
    }

    if (
        shouldToggle.ultimatePackage &&
        toggleStates.current['ultimate package'] && // what it is
        (trimmedName === 'ultimate package' ||
            toggleStates.next[trimmedName] === false) // what it should be
    ) {
        return true
    }

    // If ultimate package needs to be toggled, and the direction it needs to be toggled is on,
    // and we're looking at an option that is NOT ultimate package itself
    if (
        shouldToggle.ultimatePackage &&
        !toggleStates.current['ultimate package'] &&
        trimmedName !== 'ultimate package'
    ) {
        // If we're looking at toe plates or last and we haven't just disabled them
        if (
            (trimmedName === 'toe plates' ||
                trimmedName === 'last' ||
                trimmedName === 'toe detail') &&
            toggleStates.current[trimmedName] === true &&
            toggleStates.next[trimmedName] === true
        ) {
            return false
        }

        // Most things other than toe plates or last should be disabled because we don't need
        // their individual upcharge because that's now covered by ultimate package
        return true
    }

    return false
}

export const updateCheckboxTogglesForAllInOneCharge = (
    checkboxToggles,
    toggleStates,
    shouldToggle,
    isInit = false
) => {
    const updatedSelections = {}

    checkboxToggles.forEach(toggle => {
        let updatedOptionValue = toggle.value

        const shouldUncheck = getShouldUncheck(
            toggle.trimmedName,
            toggleStates,
            shouldToggle,
            isInit
        )
        if (shouldUncheck) {
            updatedOptionValue = toggle.noValue
        }

        updatedSelections[toggle.entityId] = updatedOptionValue
    })

    return updatedSelections
}

const updateAllInOneBool = (name, shouldToggle, toggleState) => {
    let updatedBool = toggleState[name] || false

    if (shouldToggle && toggleState[name]) {
        updatedBool = false
    }
    if (shouldToggle && !toggleState[name]) {
        updatedBool = true
    }

    return updatedBool
}

export const getBoolsForAllInOneCharges = (
    toggleState,
    selectedValues,
    optionNames,
    blackEditionOptions
) => {
    const shouldToggleUltimatePackage =
        checkShouldToggleUltimatePackage(toggleState)
    const shouldToggleBlackEdition = checkShouldToggleBlackEdition(
        selectedValues,
        optionNames,
        blackEditionOptions,
        toggleState
    )

    const ultimatePackageBool = updateAllInOneBool(
        'ultimate package',
        shouldToggleUltimatePackage,
        toggleState
    )
    const blackEditionBool = updateAllInOneBool(
        'black edition',
        shouldToggleBlackEdition,
        toggleState
    )

    return {
        shouldToggleUltimatePackage,
        shouldToggleBlackEdition,
        ultimatePackageBool,
        blackEditionBool,
    }
}

export const corthayCheck = (
    archiveData,
    productOptions,
    nameDigit,
    valueDigit,
    selectedValues,
    checkboxToggles,
    checkboxToggleState
) => {
    const { blackEditionOptions, defaultOptions, optionNames } = archiveData

    const updatedCheckboxToggleState = { ...checkboxToggleState.next }
    let updatedSelections = { ...selectedValues }
    const returnDontToggle = {
        shouldUpdateProduct: false,
        updatedCheckboxToggleState,
        updatedSelections,
    }

    // This is a weird thing that has to do with the way we store the
    // leather color the customer selects. We only change 'leather' if
    // the type of leather changes. But leather color changes on every
    // selection. This works for most brands, because most only charge a
    // different fee if the type of leather changes. This doesn't work
    // for Corthay, because, for some shoes, they'll charge a fee even
    // for a different color of the same leather. So we don't listen to
    // leather changes, and treat leather color changes as leather changes.
    let optionName = optionNames[nameDigit].name
    if (optionName === 'leather') return returnDontToggle
    if (optionName === 'leather color') optionName = 'leather'

    // When leather color changes, you won't find the optionValue in the
    // optionNames object. Instead, just use valueDigit, which in this case
    // is not a digit but the name of the leather itself (i.e., Black Calf).
    let optionValue = optionNames[nameDigit].values[valueDigit]
    if (optionName === 'leather') optionValue = valueDigit

    // If the option for the selected value doesn't have a toggle, then we
    // return null because we don't need to, and can't, toggle anything.
    const toggleName = getOptionToggle(optionName, optionNames)
    if (toggleName === null) return returnDontToggle

    // These two values give us context for ultimate package. They don't help
    // with black edition.
    const isChangeOptionChecked = checkIfChangeOptionChecked(
        toggleName,
        optionNames,
        selectedValues
    )
    const isADefaultOption = checkIfInDefaultOptions(
        optionName,
        optionValue,
        defaultOptions
    )

    let shouldToggle = false
    let toggleValue = null

    // Uncheck the toggle
    if (isADefaultOption || optionValue === '' || optionValue === undefined) {
        shouldToggle = true
        toggleValue = optionNames[toggleName].values.no
        updatedCheckboxToggleState[optionName] = false
    } else {
        // Check the toggle.
        // We only toggle these if ultimate package isn't checked. Otherwise
        // the price would include the ultimate package price *and* the single
        // item upcharge. Same for black edition.
        // Also, if black edition is checked and the option we're evaluating is last,
        // then we need to check it.
        // Also if we're looking at toe detail, no matter what the context.
        if (
            (!checkboxToggleState.next['ultimate package'] &&
                !checkboxToggleState.next['black edition'] &&
                !isChangeOptionChecked) ||
            ((checkboxToggleState.next['ultimate package'] ||
                checkboxToggleState.next['black edition']) &&
                optionName === 'last') ||
            optionName === 'toe detail'
        ) {
            shouldToggle = true
            toggleValue = optionNames[toggleName].values.yes
        }
        updatedCheckboxToggleState[optionName] = true
    }

    const {
        shouldToggleUltimatePackage,
        shouldToggleBlackEdition,
        ultimatePackageBool,
        blackEditionBool,
    } = getBoolsForAllInOneCharges(
        updatedCheckboxToggleState,
        selectedValues,
        optionNames,
        blackEditionOptions
    )

    updatedCheckboxToggleState['ultimate package'] = ultimatePackageBool
    updatedCheckboxToggleState['black edition'] = blackEditionBool

    let updatedProductOptions = null
    let shouldUpdateProduct = false
    const hasToeDetailOption = getHasSpecificOption(
        'Toe Detail',
        productOptions
    )

    if (shouldToggleUltimatePackage || shouldToggleBlackEdition) {
        const checkboxToggleUpdatedSelections =
            updateCheckboxTogglesForAllInOneCharge(
                checkboxToggles,
                {
                    current: checkboxToggleState.current,
                    next: updatedCheckboxToggleState,
                },
                {
                    ultimatePackage: shouldToggleUltimatePackage,
                    blackEdition: shouldToggleBlackEdition,
                }
            )

        updatedSelections = {
            ...updatedSelections,
            ...checkboxToggleUpdatedSelections,
        }
    } else if (shouldToggle && hasToeDetailOption && optionName === 'last') {
        const { last, toeDetail } = getNamesAndVals(productOptions)
        const testFunc = (selectedLabel, validValues) =>
            validValues.includes(selectedLabel)

        const {
            fluxIsSelected,
            updatedSelections: updatedToeDetailSelections,
            updatedOptions,
        } = getEnabledOrDisabled({
            productOptions,
            newSelections: selectedValues,
            controlOption: {
                ...last,
                testFunc,
                validValues: ['Pullman', 'Sevres', 'Sèvres'],
            },
            fluxOption: {
                ...toeDetail,
                testFunc,
                validValues: ['Sculpted Toe'],
                valueToKeepEnabled: null,
            },
        })

        shouldUpdateProduct = true
        updatedProductOptions = [...updatedOptions]
        updatedSelections = {
            ...selectedValues,
            ...updatedToeDetailSelections,
            [toggleName]: toggleValue,
        }
        // Some shoes (Casanova) don't have an upcharge for toe detail,
        // so it shouldn't be listed in the PriceTally
        if (updatedCheckboxToggleState?.['toe detail']) {
            updatedCheckboxToggleState['toe detail'] = fluxIsSelected
        }
    } else if (shouldToggle) {
        updatedSelections[toggleName] = toggleValue
    }

    return {
        shouldUpdateProduct,
        updatedCheckboxToggleState,
        updatedProductOptions,
        updatedSelections,
    }
}

export const getCheckboxToggles = options => {
    const toggles = []

    options.forEach(option => {
        const optionName = option.displayName.toLowerCase()
        const trimmedName = optionName
            .replace(regexBeginWithHas, '')
            .replace(regexEndWithChange, '')

        if (regexHasChange.test(optionName)) {
            toggles.push({
                ...option,
                trimmedName,
            })
        }
    })

    return toggles
}

export const getInitCorthay = (
    checkboxToggles,
    checkboxToggleState,
    selectedValues,
    archiveData,
    productOptions
) => {
    const { optionNames, blackEditionOptions } = archiveData
    const { ultimatePackageBool, blackEditionBool } =
        getBoolsForAllInOneCharges(
            checkboxToggleState,
            selectedValues,
            optionNames,
            blackEditionOptions
        )

    const updatedCheckboxToggleState = {
        ...checkboxToggleState,
        'ultimate package': ultimatePackageBool,
        'black edition': blackEditionBool,
    }

    // Update the object that stores all the current selections. This is the object we send to
    // BigCommerce for updated prices, stock, etc.
    let updatedSelections = { ...selectedValues }

    if (ultimatePackageBool || blackEditionBool) {
        const checkboxToggleUpdatedSelections =
            updateCheckboxTogglesForAllInOneCharge(
                checkboxToggles,
                {
                    current: checkboxToggleState,
                    next: updatedCheckboxToggleState,
                },
                {
                    ultimatePackage: ultimatePackageBool,
                    blackEdition: blackEditionBool,
                },
                true
            )

        updatedSelections = {
            ...updatedSelections,
            ...checkboxToggleUpdatedSelections,
        }
    }

    const hasToeDetailOption = getHasSpecificOption(
        'Toe Detail',
        productOptions
    )
    let updatedProductOptions = null
    let shouldUpdateProduct = false

    if (hasToeDetailOption) {
        const { last, toeDetail } = getNamesAndVals(productOptions)
        const testFunc = (selectedLabel, validValues) =>
            validValues.includes(selectedLabel)

        const {
            fluxIsSelected,
            updatedSelections: updatedToeDetailSelections,
            updatedOptions,
        } = getEnabledOrDisabled({
            productOptions,
            newSelections: updatedSelections,
            controlOption: {
                ...last,
                testFunc,
                validValues: ['Pullman', 'Sevres', 'Sèvres'],
            },
            fluxOption: {
                ...toeDetail,
                testFunc,
                validValues: ['Sculpted Toe'],
                valueToKeepEnabled: null,
            },
        })

        shouldUpdateProduct = true
        updatedProductOptions = [...updatedOptions]
        updatedSelections = {
            ...updatedSelections,
            ...updatedToeDetailSelections,
        }
        if (updatedCheckboxToggleState?.['toe detail']) {
            updatedCheckboxToggleState['toe detail'] = fluxIsSelected
        }
    }

    return {
        shouldUpdateProduct,
        updatedCheckboxToggleState,
        updatedSelections,
        updatedProductOptions,
    }
}

export const getOptionLabel = (label, value, name, conditionals) => {
    const { archiveData, brandName, isArchiveColl } = conditionals

    if (isArchiveColl && archiveData?.defaultOptions?.[name]) {
        const isDefault = checkIfInDefaultOptions(
            name,
            value,
            archiveData.defaultOptions
        )
        if (isDefault) {
            return label
        }

        const formattedBrandName = brandName
            .toLowerCase()
            .replace(/ [a-zA-Z0-9]/, match => match.trim().toUpperCase())

        const upcharge = upcharges[formattedBrandName][name]
        return `${label} (+ $${upcharge})`
    }

    return label
}
