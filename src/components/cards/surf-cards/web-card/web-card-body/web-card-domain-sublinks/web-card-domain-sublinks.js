
import "./web-card-domain-sublinks.scss";

import CustomComponent from "components/custom-component";
import CardTitle from "components/cards/base-components/card-title/card-title";

export default
class WebCardDomainSublinks extends CustomComponent {

    get _sublinks(): JSX[] {
        return (this.props.links || []).map( ({ href, snip, title }) => {
            return (
                <li>
                    <a href={href}>
                        <CardTitle text={title} />
                    </a>
                    <p>{snip}</p>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="WebCardDomainSublinks">
                {this._sublinks}
            </ul>
        );
    }

}
