
import { useState } from "react";

//import CustomComponent from "components/custom-component"

import "./favicon.scss";

/**
 * Returns a favicon for the specified website.
 * The favicons have been provided by real world services and therefore the backend is out of our control
 * @extends {CustomComponent}

 * @property {String} website - The origin of the website to extract favicons from E.G: https://www.example.com
                              - Either this property or the 'protocol' and 'host' properties can be used to construct a url to to the favicon server

 * @property {Number?} size - A positive number, preferably a multiple of 16 as those are the sizes mostly used by websites
                           - WARNING: If the image size specified is not found, some favicon servers will return the smallest image it has of the specified website
 * @property {Boolean?} greyscale -
 * @property {String?} protocol - Use ths with the 'host' property if the 'website' property is not specified
 * @property {String?} host - Use ths with the 'protocol' property if the 'website' property is not specified
 */
export default
function Favicon(props): JSX {

    const alt  = "Website Favicon";
    const size = props.size || 32;
    const website = props.website || `${props.protocol}${"//"}${props.host}`;

    const servers = [
        "gstatic",
        "clearbit",
    ];

    let href;
    const imgServer = process.env.REACT_APP_FAVICON_SERVER;
    switch (imgServer) {
        case servers[0]: href = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${website}&size=${size}`; break;
        case servers[1]: href = `http://logo.clearbit.com/${website}?size=${size}${(props.greyscale) ? "&greyscale" : ""}`; break;

        default:
            throw new RangeError(`Expected one of ${servers} for REACT_APP_FAVICON_SERVER environment arg, got ${imgServer}`);
    }

    let [src, setSrc] = useState(href);

    const err = function() {
        const fallbackSrc = "FALLBACK SRC";
        setSrc(fallbackSrc);
        //console.log(`Error retrieving favicon for ${website}`);
        //console.log(`Reset image src to ${fallbackSrc}`);
    }

    return <img src={src} alt={alt} onError={err}/>;
}
