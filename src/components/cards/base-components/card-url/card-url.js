
import CustomComponent from "components/custom-component";

import "./card-url.scss";

/**
 * Used by Cards to show the URL of the associated website
 * @property {URL} url - A link to be used as the text content of the element
 */
export default
class CardUrl extends CustomComponent {

    render() {

        return (
            <p className="CardUrl">
                <i>{this.props.url.protocol + "//"}</i>
                {" " /* Added a space between the protocol and the host for readbility */}
                <b>{this.props.url.host}</b>
                {" " /* Here too */}
                <i>{this.props.url.pathname}</i>
            </p>
        );
    }

}
