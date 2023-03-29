import PropTypes from 'prop-types'

import MegaMenuWrapper from '../MegaMenuWrapper'
import Callout from './Callout'
import Header from './Header'
import LinkGroup from './LinkGroup'

export default function MegaMenuWithSections({
    description,
    dropdownMenu,
    hideMenu,
    parentName,
    parentUrl,
    submenuIsOpen,
}) {
    return (
        <MegaMenuWrapper isOpen={submenuIsOpen}>
            <Header
                description={description}
                hideMenu={hideMenu}
                parentName={parentName}
                parentUrl={parentUrl}
            />
            {dropdownMenu.map((section, index) => {
                if (
                    section.slice_type === 'links' &&
                    section.primary.group_enabled
                ) {
                    return (
                        <LinkGroup
                            cols={section.primary.cols}
                            hideMenu={hideMenu}
                            links={section.items}
                            title={section.primary.group_label}
                            key={index}
                        />
                    )
                }
                if (
                    section.slice_type === 'callout' &&
                    section.primary.callout_enabled
                ) {
                    return (
                        <Callout
                            buttonLink={section.primary.c_button_link}
                            buttonText={section.primary.c_button_text}
                            description={section.primary.c_description}
                            hideMenu={hideMenu}
                            title={section.primary.c_title}
                            key={index}
                        />
                    )
                }
                return null
            })}
        </MegaMenuWrapper>
    )
}

MegaMenuWithSections.propTypes = {
    description: PropTypes.array,
    dropdownMenu: PropTypes.array,
    hideMenu: PropTypes.func,
    parentName: PropTypes.string,
    parentUrl: PropTypes.object,
    submenuIsOpen: PropTypes.bool,
}
