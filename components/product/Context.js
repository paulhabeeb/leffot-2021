import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const ProductContext = createContext()
const HandleChangeContext = createContext()

export const useProductContext = () => useContext(ProductContext)
export const useHandleChangeContext = () => useContext(HandleChangeContext)

export const ProductContextProvider = ({ children, init }) => {
    const [availableOptions, setAvailableOptions] = useState(
        init.availableOptions
    )
    const [imageIsLoading, setImageIsLoading] = useState(true)
    const [defaultImage, setDefaultImage] = useState(init.defaultImage)
    const [prices, setPrices] = useState(init.prices)

    const values = {
        availableOptions,
        imageIsLoading,
        defaultImage,
        prices,
        setAvailableOptions,
        setDefaultImage,
        setImageIsLoading,
        setPrices,
    }

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    )
}

ProductContextProvider.propTypes = {
    children: PropTypes.node,
    init: PropTypes.object,
}

export const HandleChangeContextProvider = ({ children, handleChange }) => {
    return (
        <HandleChangeContext.Provider value={handleChange}>
            {children}
        </HandleChangeContext.Provider>
    )
}

HandleChangeContextProvider.propTypes = {
    children: PropTypes.node,
    handleChange: PropTypes.func,
}
