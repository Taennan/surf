
import "./web-card-body.scss";

import CustomComponent from "components/custom-component";

import CardDescription from "components/cards/base-components/card-description/card-description";
import WebCardPageSublinks from "./web-card-page-sublinks/web-card-page-sublinks";
import WebCardDomainSublinks from "./web-card-domain-sublinks/web-card-domain-sublinks";

/**
 * [className snipription]
 * @extends {CustomComponent}

 * @property {String} snippet -
 * @property {JSON[]?} domainSublinks -
 * @property {JSON[]?} pageSublinks -
 */
export default
class WebCardBody extends CustomComponent {

    render() {

        const domainSublinks = (this.props.domainSublinks) ? <WebCardDomainSublinks links={this.props.domainSublinks} /> : null;
        const pageSublinks   = (this.props.pageSublinks)   ? <WebCardPageSublinks   links={this.props.pageSublinks}   /> : null;

        return (
            <main className="WebCardBody">
                <CardDescription text={this.props.snippet}/>
                {domainSublinks}
                {pageSublinks}
            </main>
        );
    }

}
