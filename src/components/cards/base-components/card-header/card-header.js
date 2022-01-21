
import CustomComponent from "components/custom-component";

import CardTitle from "../card-title/card-title";
import CardUrl   from "../card-url/card-url";
//import Picture   from "components/media/picture/picture";
import Favicon from "components/media/favicon/favicon";

import "./card-header.scss";

/**
 * [className description]
 * @extends {CustomComponent}
 *
 * @property {URL} url -
 * @property {String} title -
 */
export default
class CardHeader extends CustomComponent {

    render() {
        return(
            <header className="CardHeader">
                <a href={this.props.url.href}>
                    <CardUrl url={this.props.url} />
                    {/*<Picture.Favicon website={this.url.origin} />*/}
                    <Favicon website={this.props.url.origin} />
                    <CardTitle.Header text={this.props.title} />
                </a>
            </header>
        )
    }

}
