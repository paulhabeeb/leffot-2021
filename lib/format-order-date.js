const formatOrderDate = date => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return new Date(date).toLocaleDateString('en-us', options)
}

export default formatOrderDate
