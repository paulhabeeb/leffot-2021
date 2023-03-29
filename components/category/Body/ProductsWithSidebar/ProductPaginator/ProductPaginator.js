import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import cn from 'classnames'

import styles from './ProductPaginator.module.scss'

function PaginatorNumber({ isLink, label, page, setCurrentPage }) {
    const router = useRouter()

    const handleClick = () => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page,
                },
            },
            undefined,
            {
                scroll: page !== 0,
            }
        )

        setCurrentPage(page)
    }

    const className = cn(styles.page, {
        [styles.pageLink]: isLink,
        [styles.currentPage]: !isLink && label !== '…',
    })

    return (
        <li className={styles.pageWrapper} onClick={handleClick}>
            <span className={className}>{label || page}</span>
        </li>
    )
}

PaginatorNumber.defaultProps = {
    isLink: true,
}

PaginatorNumber.propTypes = {
    isLink: PropTypes.bool,
    label: PropTypes.string,
    page: PropTypes.number,
    setCurrentPage: PropTypes.func,
}

export default function ProductPaginator({
    currentPage,
    setCurrentPage,
    totalPages,
}) {
    const MAX_GREATER_LESSER = 3
    let lesserPages = []
    let greaterPages = []

    if (currentPage > 1) {
        // Always show the first page
        lesserPages.push(
            <PaginatorNumber page={1} setCurrentPage={setCurrentPage} key='1' />
        )

        // If we're on, say, page 7 of 26, show an ellipsis instead of every single
        /// page option from 1 to 7
        if (currentPage - MAX_GREATER_LESSER >= MAX_GREATER_LESSER) {
            lesserPages.push(
                <PaginatorNumber label='…' key='...1' isLink={false} />
            )
        }

        // Show only the three pages preceding the current page
        for (let i = currentPage - MAX_GREATER_LESSER; i < currentPage; i++) {
            // Make sure the page number is greater than one, helpful when we're on page two
            if (i > 1) {
                lesserPages.push(
                    <PaginatorNumber
                        page={i}
                        setCurrentPage={setCurrentPage}
                        key={i}
                    />
                )
            }
        }
    }

    if (currentPage < totalPages) {
        // Show only the three pages after the current page
        for (
            let i = currentPage + 1;
            i <= currentPage + MAX_GREATER_LESSER;
            i++
        ) {
            if (i < totalPages) {
                greaterPages.push(
                    <PaginatorNumber
                        page={i}
                        setCurrentPage={setCurrentPage}
                        key={i}
                    />
                )
            }
        }

        // Show an ellipsis, as before
        if (currentPage + MAX_GREATER_LESSER < totalPages - 1) {
            greaterPages.push(
                <PaginatorNumber label='…' key='...2' isLink={false} />
            )
        }

        // Always show the last page
        greaterPages.push(
            <PaginatorNumber
                page={totalPages}
                setCurrentPage={setCurrentPage}
                key={totalPages}
            />
        )
    }

    return (
        <ul className={styles.paginator}>
            {lesserPages}
            {currentPage > 0 && (
                <PaginatorNumber
                    isLink={false}
                    page={currentPage}
                    key={currentPage}
                />
            )}
            {greaterPages}
            {totalPages > 1 && (
                <PaginatorNumber
                    isLink={currentPage !== 0}
                    label='View All'
                    page={0}
                    setCurrentPage={setCurrentPage}
                    key='view-all'
                />
            )}
        </ul>
    )
}

ProductPaginator.propTypes = {
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    totalPages: PropTypes.number,
}
