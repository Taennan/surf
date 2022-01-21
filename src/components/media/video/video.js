
//import React from "react";

import "./video.scss";

import CustomComponent from "components/custom-component";

export default
class Video extends CustomComponent {

    render() {

        let sources = [];
        if (this.props.vidSet.sources !== undefined) {
            for (const {srcset, media} of this.props.vidSet.sources) {
                sources.push(<source srcset={srcset} media={media} />);
            }
        }

        return(
            <video className="Video">
                {sources}
                Unfortunately, your browser does not support HTML5 video
            </video>
        )
    }

}
