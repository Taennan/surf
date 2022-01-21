
import "./image-card.scss";

import CustomComponent from "components/custom-component";

import CardHeader from "components/cards/base-components/card-header/card-header";
//import Picture    from "components/media/picture/picture";

/**
 * [className description]
 * @extends {CustomComponent}

 * @property {String} href -
 * @property {String} title -
 * @property {String} src -
 * @property {String?} alt -
 */
export default
class ImageCard extends CustomComponent {

    render() {

        const url = new URL(this.props.href)

        return (
            <section className="ImageCard">
                <CardHeader url={url} title={this.props.title} />
                <main>
                    <img className="" src={this.props.src} alt={this.props.alt || ""} />
                </main>
            </section>
        );

    }

}
