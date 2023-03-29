import PropTypes from 'prop-types'
import Link from 'next/link'

import styles from './Nav.module.scss'

function NavItem({ hasLink, pageNumber }) {
    return (
        <li className={styles.listItem}>
            {hasLink ? (
                <Link href={`/journal/page/${pageNumber}`}>{pageNumber}</Link>
            ) : (
                <>{pageNumber}</>
            )}
        </li>
    )
}

NavItem.propTypes = {
    hasLink: PropTypes.bool,
    pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

NavItem.defaultProps = {
    hasLink: true,
}

export default function Nav({ journal }) {
    const { page, total_pages } = journal

    return (
        <nav aria-label='Journal navigation'>
            <ul className={styles.list}>
                {page > 1 && <NavItem pageNumber={1} />}
                {page - 2 > 1 && (
                    <>
                        {page - 3 > 1 && (
                            <NavItem pageNumber='...' hasLink={false} />
                        )}
                        <NavItem pageNumber={page - 2} />
                    </>
                )}
                {page - 1 > 1 && <NavItem pageNumber={page - 1} />}
                <NavItem pageNumber={page} hasLink={false} />
                {page + 1 < total_pages && <NavItem pageNumber={page + 1} />}
                {page + 2 < total_pages && (
                    <>
                        <NavItem pageNumber={page + 2} />
                        {page + 3 < total_pages && (
                            <NavItem pageNumber='...' hasLink={false} />
                        )}
                    </>
                )}
                {page < total_pages && <NavItem pageNumber={total_pages} />}
            </ul>
        </nav>
    )
}

Nav.propTypes = {
    journal: PropTypes.object,
}
