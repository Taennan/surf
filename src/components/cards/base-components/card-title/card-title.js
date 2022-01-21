
import './card-title.scss';

import CustomComponent from "components/custom-component";

import { InvalidPropertyValueError } from "errors/component-errors";

const TitleType = {
    header: "header",
    domainSublink: "domainSublink",
    pageSublink: "pageSublink"
};

/**
 * [type description]
 * @extends {CustomComponent}

 * @property {String} text -
 */
export default
class CardTitle extends CustomComponent {

    /**
     * Returns a CardTitle component with a type property of 'header'
     * @param {String} text - The text content of the element
     */
    static Header(props) { return <CardTitle type={TitleType.header} text={props.text}/>; }
    /**
     * Returns a CardTitle component with a type property of 'domainSublink'
     * @param {String} text - The text content of the element
     */
    static DomainSublink(props) { return <CardTitle type={TitleType.domainSublink} text={props.text}/>; }
    /**
     * Returns a CardTitle component with a type property of 'pageSubLink'
     * @param {String} text - The text content of the element
     */
    static PageSublink(props) { return <CardTitle type={TitleType.pageSublink} text={props.text}/>; }


    render() {
        switch (this.props.type) {
            case TitleType.header:
                return <h1 className="CardTitle">{this.props.text}</h1>;
            case TitleType.domainSublink:
                return <h2 className="CardTitle">{this.props.text}</h2>;
            case TitleType.pageSublink:
                return <p  className="CardTitle">{this.props.text}</p>;
            default:
                throw new InvalidPropertyValueError(this, "type", this.props.type, Object.keys(TitleType));
        }
    }

}
