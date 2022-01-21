
import './card-description.scss';

import CustomComponent from "components/custom-component";

/**
 * Used in Card bodies as a summary of the webpage
 * @extends {CustomComponent}
 */
export default
class CardDescription extends CustomComponent {

    render() {
        return (
            <p className="CardDescription">{this.props.text}</p>
        );
    }

}
