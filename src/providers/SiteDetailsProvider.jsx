import { createContext } from "react";
import PropTypes from 'prop-types';

export const SiteDetailsContext = createContext(null);

const SiteDetailsProvider = ({children}) => {

    const siteName = "ParcelPro";

    const siteInfo = {
        siteName,
    }

    return (
        <SiteDetailsContext.Provider value={siteInfo}>
            {children}
        </SiteDetailsContext.Provider>
    );
};

SiteDetailsProvider.propTypes = {
    children: PropTypes.node
}

export default SiteDetailsProvider;