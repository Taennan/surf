
import CustomComponent from "components/custom-component";

import CardHeader from "components/cards/base-components/card-header/card-header";
import CardFooter from "components/cards/base-components/card-footer/card-footer";

import WebCardBody from "./web-card-body/web-card-body";

import "./web-card.scss";

/**
 * [url snipription]
 * @extends {CustomComponent}

 * @property {String} href -
 * @property {String} title -
 * @property {String} snippet -
 * @property {JSON[]?} pageSublinks -
 * @property {JSON[]?} domainSublinks -
 */
export default
class WebCard extends CustomComponent {

    render() {

        if (this.props.href === undefined) {
            //console.log(`URL: ${this.props.href} FOR CARD ${this.props.title}`);
        }

        const url = new URL(this.props.href);

        return (
            <section className="WebCard">
                <CardHeader
                    url={url}
                    title={this.props.title}/>
                <WebCardBody
                    snippet={this.props.snippet}
                    pageSublinks={this.props.pageSublinks}
                    domainSublinks={this.props.domainSublinks}/>
                <CardFooter
                    httpsSecure={url.protocol === "https:"}
                    hasWarnings={false} />
            </section>
        );

    }

}
